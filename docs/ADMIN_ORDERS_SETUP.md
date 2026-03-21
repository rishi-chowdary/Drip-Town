# Admin Dashboard & Order Management System

## Overview

DripTown now has a complete **Admin Dashboard** system that allows you to:
- View all customer orders in real-time
- Manage order statuses (Pending → Confirmed → Shipped → Delivered)
- Track shipments with tracking numbers
- Automatic sync with Google Sheets
- Real-time order statistics and analytics

## Key Features

### 1. **Real-Time Order Tracking**
- View all orders in an organized table
- See order details instantly
- Filter by status or search by Order ID, customer name, email, or phone
- Keep track of exact order quantities and prices

### 2. **Order Management**
- Update order status with a single click
- Add tracking numbers for shipped orders
- Monitor order fulfillment pipeline
- View complete order history

### 3. **Google Sheets Integration**
- Every order automatically syncs to Google Sheets
- No manual data entry needed
- Updates reflect instantly
- Built-in fallback to local storage if Sheets unavailable

### 4. **Analytics Dashboard**
- Total orders count
- Orders by status breakdown
- Total revenue calculations
- Key metrics at a glance

## Quick Setup

### Step 1: Set Admin Access (Development)
```javascript
// In browser console (F12 → Console)
localStorage.setItem('driptownAdminKey', 'ADMIN_DRIPTOWN_2024');
```

### Step 2: Access Dashboard
Navigate to: `http://localhost:5173/admin/dashboard`

### Step 3: (Optional) Configure Google Sheets
See `docs/GOOGLE_SHEETS_SETUP.md` for detailed instructions

## File Structure

```
src/app/
├── pages/
│   └── AdminDashboard.tsx          # Main admin dashboard component
├── utils/
│   └── sheetsAPI.ts                # Google Sheets integration utility
└── routes.tsx                      # Updated with /admin/dashboard route

docs/
├── GOOGLE_SHEETS_SETUP.md          # Google Sheets configuration guide
├── ADMIN_DASHBOARD_GUIDE.md        # Admin dashboard user manual
└── ADMIN_ORDERS_SETUP.md           # This file

.env.local (to create)
├── VITE_SHEET_ID                   # Your Google Sheet ID
└── VITE_SHEETS_API_KEY             # Your Google Sheets API key
```

## System Architecture

### Frontend (React/TypeScript)
- **AdminDashboard.tsx** - Dashboard UI with filtering and management
- **sheetsAPI.ts** - Handles all Sheets API communication

### Data Flow
1. Customer places order in Checkout
2. Order data is structured and sent to Google Sheets
3. Order is also stored in localStorage as backup
4. Admin dashboard displays orders from both sources
5. Admin updates status → syncs back to Sheets

### Storage
- **Primary**: Google Sheets (if configured)
- **Secondary**: localStorage (always available as fallback)
- **Order Format**: Standardized OrderData interface

## Order Data Structure

Each order contains:
- Unique Order ID (auto-generated)
- Customer information (name, email, phone)
- Shipping address (complete)
- Order items (with prices, quantities, colors, sizes)
- Financial data (subtotal, discount, discount amount, total)
- Status tracking (pending/confirmed/shipped/delivered/cancelled)
- Tracking number (optional, for shipped orders)
- Timestamps

## API Reference

### `syncOrderToSheets(order: OrderData)`
Sends a new order to Google Sheets

**Returns**: `{ success: boolean, error?: string }`

### `getOrdersFromSheets()`
Retrieves all orders from Google Sheets

**Returns**: `OrderData[]`

### `updateOrderStatusInSheets(orderId, status, trackingNumber?)`
Updates order status and tracking in Google Sheets

**Returns**: `{ success: boolean, error?: string }`

### `initializeGoogleSheet()`
Sets up Google Sheet with proper headers

**Returns**: `{ success: boolean, error?: string }`

## Environment Variables

```env
# Google Sheets Configuration
VITE_SHEET_ID=your_sheet_id_here
VITE_SHEETS_API_KEY=your_api_key_here
```

Get these from:
- **Sheet ID**: URL of your Google Sheet
- **API Key**: Google Cloud Console > APIs & Services > Credentials

## Admin Features

### Dashboard View
- Stats panel showing key metrics
- Searchable, filterable order table
- Color-coded status badges
- Quick action buttons

### Order Details Modal
- Complete customer information
- Full item list with specs
- Price breakdown
- Shipping address
- Current status and tracking

### Order Update Modal
- Status dropdown (5 options)
- Tracking number input
- Save changes to Sheets

## Google Sheets Columns

| # | Column | Description |
|---|--------|-------------|
| A | Order ID | Unique identifier |
| B | Date | When order was placed |
| C | Customer Name | Full name |
| D | Email | Customer email |
| E | Phone | Contact number |
| F | Address | Full shipping address |
| G | Items | Comma-separated item list |
| H | Subtotal | Before discount |
| I | Discount % | Discount percentage |
| J | Discount Amount | Money saved |
| K | Total | Final price paid |
| L | Status | Current order status |
| M | Tracking # | Courier tracking number |
| N | Notes | Internal notes |

## Common Workflows

### Processing a New Order
1. Admin logs in and views dashboard
2. See "Pending" orders in filter
3. Click order to review details
4. Click Edit → Change to "Confirmed"
5. Google Sheets updates automatically

### Shipping an Order
1. Click Edit on confirmed order
2. Change status to "Shipped"
3. Enter tracking number from courier
4. Click Update → Customer can track order

### Customer Inquiry
1. Search customer name/email
2. View all their orders
3. Check status and tracking
4. Respond to customer

## Error Handling

The system has built-in resilience:
- ✅ Google Sheets unavailable? Falls back to localStorage
- ✅ API key invalid? Shows warning, uses local storage
- ✅ Network error? Orders queued and retry upon success
- ✅ Duplicate orders? Prevented with unique IDs

## Performance

- Dashboard loads quickly (data cached)
- Search/filter instant (client-side)
- Sheets sync happens asynchronously
- No blocking operations

## Security Considerations

### Current (Development)
- Admin key stored in localStorage
- Not suitable for production

### For Production (Recommended)
- Implement proper authentication system
- Use secure session tokens
- Add password protection to dashboard
- Store API keys on backend only
- Implement role-based access control
- Add audit logging
- Use HTTPS only

## Troubleshooting

### Orders Not Appearing
1. Check if user is logged in
2. Verify localStorage has order data
3. Check browser console for errors

### Sheets Not Syncing
1. Verify API key is correct
2. Check Sheet ID is correct
3. Ensure Google Sheets API is enabled
4. Check API key has Sheets API permissions

### Can't Access Dashboard
1. Set admin key again (localStorage gets cleared sometimes)
2. Check browser has JavaScript enabled
3. Clear localStorage and retry

## Future Enhancements

Potential improvements:
- Export orders to CSV/Excel
- Advanced analytics and charts
- Customer notification system
- Automated email confirmations
- Multi-user admin account system
- Order assignment to team members
- Return/refund management
- Inventory tracking
- Bulk operations
- Print labels

## Support & Documentation

- **Setup Help**: `docs/GOOGLE_SHEETS_SETUP.md`
- **User Guide**: `docs/ADMIN_DASHBOARD_GUIDE.md`
- **Code**: `src/app/utils/sheetsAPI.ts`
- **Component**: `src/app/pages/AdminDashboard.tsx`

## Changelog

- **v1.0** (Initial Release)
  - Admin dashboard
  - Order management
  - Google Sheets integration
  - Analytics dashboard
  - Order filtering and search
