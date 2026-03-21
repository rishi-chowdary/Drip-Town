/**
 * Google Sheets API Integration
 * This utility handles syncing orders to Google Sheets
 * 
 * Setup Instructions:
 * 1. Create a Google Cloud Project
 * 2. Enable Google Sheets API
 * 3. Create a Service Account and download JSON key
 * 4. Share your Google Sheet with the service account email
 * 5. Set VITE_SHEETS_API_KEY in .env.local
 * 6. Set VITE_SHEET_ID (the ID from the sheet URL)
 */

// @ts-ignore - Vite environment variables
const env = import.meta.env;

export interface OrderData {
  id: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }>;
  subtotal: number;
  discount: number;
  discountAmount: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
  notes?: string;
}

/**
 * Sync order data to Google Sheets
 */
export async function syncOrderToSheets(order: OrderData): Promise<{
  success: boolean;
  error?: string;
  spreadsheetId?: string;
}> {
  try {
    const sheetId = env.VITE_SHEET_ID;
    const apiKey = env.VITE_SHEETS_API_KEY;

    if (!sheetId || !apiKey) {
      console.warn(
        "Google Sheets integration not configured. Please set VITE_SHEET_ID and VITE_SHEETS_API_KEY in .env.local"
      );
      // Store order locally if Sheets is not configured
      storeOrderLocally(order);
      return { success: true };
    }

    // Prepare the row data
    const values = [
      [
        order.id,
        order.date,
        order.customerName,
        order.email,
        order.phone,
        `${order.address}, ${order.city}, ${order.state} ${order.zipCode}, ${order.country}`,
        order.items.map((i) => `${i.name} (${i.quantity}x)`).join("; "),
        order.subtotal,
        order.discount,
        order.discountAmount,
        order.total,
        order.status,
        order.trackingNumber || "-",
        order.notes || "-",
      ],
    ];

    // Append to Google Sheets via REST API
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'Orders'!A:N:append?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: values,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to sync order to Sheets: ${response.statusText}`);
    }

    const data = await response.json();

    // Also store locally as backup
    storeOrderLocally(order);

    return {
      success: true,
      spreadsheetId: data.spreadsheetId,
    };
  } catch (error) {
    console.error("Error syncing order to Sheets:", error);
    // Store order locally as fallback
    storeOrderLocally(order);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Retrieve all orders from Google Sheets
 */
export async function getOrdersFromSheets(): Promise<OrderData[]> {
  try {
    const sheetId = env.VITE_SHEET_ID;
    const apiKey = env.VITE_SHEETS_API_KEY;

    if (!sheetId || !apiKey) {
      // Return orders from local storage if Sheets not configured
      return getOrdersLocally();
    }

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'Orders'?key=${apiKey}`
    );

    if (!response.ok) {
      console.warn("Failed to fetch orders from Sheets, using local data");
      return getOrdersLocally();
    }

    const data = await response.json();
    const rows = data.values || [];

    // Skip header row and parse data
    return rows.slice(1).map((row: string[]) => ({
      id: row[0],
      date: row[1],
      customerName: row[2],
      email: row[3],
      phone: row[4],
      address: row[5],
      city: row[6],
      state: row[7],
      zipCode: row[8],
      country: row[9],
      items: [], // Would need to parse from combined field
      subtotal: parseFloat(row[10]) || 0,
      discount: parseFloat(row[11]) || 0,
      discountAmount: parseFloat(row[12]) || 0,
      total: parseFloat(row[13]) || 0,
      status: row[14] || "pending",
      trackingNumber: row[15],
      notes: row[16],
    }));
  } catch (error) {
    console.error("Error retrieving orders from Sheets:", error);
    return getOrdersLocally();
  }
}

/**
 * Update order status in Google Sheets
 */
export async function updateOrderStatusInSheets(
  orderId: string,
  status: string,
  trackingNumber?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const sheetId = env.VITE_SHEET_ID;
    const apiKey = env.VITE_SHEETS_API_KEY;

    if (!sheetId || !apiKey) {
      // Update locally
      const orders = getOrdersLocally();
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        order.status = status as any;
        if (trackingNumber) order.trackingNumber = trackingNumber;
        storeOrderLocally(order);
      }
      return { success: true };
    }

    // Get all orders and find the row index
    const getResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'Orders'?key=${apiKey}`
    );

    const data = await getResponse.json();
    const rows = data.values || [];

    const rowIndex = rows.findIndex((row: string[]) => row[0] === orderId) + 1;

    if (rowIndex === 0) {
      throw new Error("Order not found in Sheets");
    }

    // Update the row
    const updateResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'Orders'!L${rowIndex}?key=${apiKey}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[status, trackingNumber || "-"]],
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update order status in Sheets");
    }

    // Update locally as well
    const orders = getOrdersLocally();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status as any;
      if (trackingNumber) order.trackingNumber = trackingNumber;
      storeOrderLocally(order);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Local storage functions as fallback
 */
function getOrdersLocally(): OrderData[] {
  try {
    const orders = localStorage.getItem("driptownOrders");
    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
}

function storeOrderLocally(order: OrderData): void {
  try {
    const orders = getOrdersLocally();
    const existing = orders.findIndex((o) => o.id === order.id);
    if (existing >= 0) {
      orders[existing] = order;
    } else {
      orders.push(order);
    }
    localStorage.setItem("driptownOrders", JSON.stringify(orders));
  } catch (error) {
    console.error("Error storing order locally:", error);
  }
}

/**
 * Create initial Google Sheet structure
 * This should be called once to set up the sheet with headers
 */
export async function initializeGoogleSheet(): Promise<{ success: boolean; error?: string }> {
  try {
    const sheetId = env.VITE_SHEET_ID;
    const apiKey = env.VITE_SHEETS_API_KEY;

    if (!sheetId || !apiKey) {
      return {
        success: false,
        error: "Google Sheets not configured",
      };
    }

    // Set up headers
    const headers = [
      [
        "Order ID",
        "Date",
        "Customer Name",
        "Email",
        "Phone",
        "Address",
        "City",
        "State",
        "Zip Code",
        "Country",
        "Subtotal",
        "Discount (%)",
        "Discount Amount",
        "Total",
        "Status",
        "Tracking Number",
        "Notes",
      ],
    ];

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'Orders'!A1:Q1?key=${apiKey}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: headers,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to initialize Google Sheet");
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
