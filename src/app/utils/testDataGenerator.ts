/**
 * Test Data Generator for DripTown Orders
 * Run this in browser console to populate test orders
 * Usage: Copy and paste the entire function in browser console, then run createTestOrders()
 */

function createTestOrders() {
  const testOrders = [
    {
      id: "ORD-1704067200000-ABC123",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      customerName: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "9876543210",
      address: "123 Mount Road",
      city: "Chennai",
      state: "Tamil Nadu",
      zipCode: "600006",
      country: "India",
      items: [
        {
          id: "1",
          name: "Premium Black T-Shirt",
          quantity: 2,
          price: 499,
          color: "Black",
          size: "M",
        },
        {
          id: "2",
          name: "Denim Jacket",
          quantity: 1,
          price: 1999,
          color: "Blue",
          size: "L",
        },
      ],
      subtotal: 3497,
      discount: 10,
      discountAmount: 349.7,
      total: 3147.3,
      status: "pending",
    },
    {
      id: "ORD-1704153600000-DEF456",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      customerName: "Priya Singh",
      email: "priya.singh@example.com",
      phone: "9988776655",
      address: "456 Electronic City",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560100",
      country: "India",
      items: [
        {
          id: "3",
          name: "White Casual Shirt",
          quantity: 3,
          price: 399,
          color: "White",
          size: "S",
        },
        {
          id: "4",
          name: "Cargo Shorts",
          quantity: 1,
          price: 799,
          color: "Khaki",
          size: "32",
        },
      ],
      subtotal: 2396,
      discount: 0,
      discountAmount: 0,
      total: 2396,
      status: "confirmed",
      trackingNumber: "UPS123456789",
    },
    {
      id: "ORD-1704240000000-GHI789",
      date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      customerName: "Amit Patel",
      email: "amit.patel@example.com",
      phone: "8765432109",
      address: "789 Cyber Hub, DLF",
      city: "Gurgaon",
      state: "Haryana",
      zipCode: "122001",
      country: "India",
      items: [
        {
          id: "5",
          name: "Leather Belt",
          quantity: 1,
          price: 599,
          color: "Brown",
          size: "32",
        },
        {
          id: "6",
          name: "Combat Boots",
          quantity: 1,
          price: 2499,
          color: "Black",
          size: "9",
        },
        {
          id: "7",
          name: "Hoodie Sweater",
          quantity: 1,
          price: 899,
          color: "Grey",
          size: "M",
        },
      ],
      subtotal: 3997,
      discount: 15,
      discountAmount: 599.55,
      total: 3397.45,
      status: "shipped",
      trackingNumber: "FDX987654321",
    },
    {
      id: "ORD-1704326400000-JKL012",
      date: new Date().toISOString(),
      customerName: "Neha Gupta",
      email: "neha.gupta@example.com",
      phone: "9123456789",
      address: "321 Juhu Tara Road",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400049",
      country: "India",
      items: [
        {
          id: "8",
          name: "Summer Dress",
          quantity: 2,
          price: 1299,
          color: "Pink",
          size: "M",
        },
        {
          id: "9",
          name: "Sunglasses",
          quantity: 1,
          price: 1999,
          color: "Black",
          size: "One Size",
        },
      ],
      subtotal: 4597,
      discount: 20,
      discountAmount: 919.4,
      total: 3677.6,
      status: "pending",
    },
    {
      id: "ORD-1704412800000-MNO345",
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      customerName: "Vikram Sharma",
      email: "vikram.sharma@example.com",
      phone: "7654321098",
      address: "654 Park Street",
      city: "Kolkata",
      state: "West Bengal",
      zipCode: "700016",
      country: "India",
      items: [
        {
          id: "10",
          name: "Formal Blazer",
          quantity: 1,
          price: 3499,
          color: "Navy Blue",
          size: "L",
        },
        {
          id: "11",
          name: "Dress Pants",
          quantity: 2,
          price: 1299,
          color: "Black",
          size: "34",
        },
      ],
      subtotal: 6097,
      discount: 0,
      discountAmount: 0,
      total: 6097,
      status: "delivered",
      trackingNumber: "DHL654321987",
    },
  ];

  // Save to localStorage
  localStorage.setItem("driptownOrders", JSON.stringify(testOrders));

  console.log("✅ Test orders created successfully!");
  console.log(`📦 Total test orders: ${testOrders.length}`);
  console.log("Orders:");
  testOrders.forEach((order) => {
    console.log(
      `  - ${order.id}: ${order.customerName} (${order.status}) - ₹${order.total}`
    );
  });
  console.log("\n🔄 Refresh the page or go to /admin/dashboard to see the orders");
}

// Also provide a function to clear test orders
function clearTestOrders() {
  localStorage.removeItem("driptownOrders");
  console.log("✅ Test orders cleared");
}

// Log available functions
console.log("📝 Test Data Functions Available:");
console.log("  createTestOrders() - Add 5 sample orders");
console.log("  clearTestOrders() - Remove all test orders");

// Auto-run if manually called
createTestOrders();
