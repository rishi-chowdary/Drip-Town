# Admin Dashboard Quick Reference

## Quick Start

### 1. Enable Admin Access
In browser console (F12 → Console tab):
```javascript
localStorage.setItem('driptownAdminKey', 'ADMIN_DRIPTOWN_2024');
```

### 2. Access Dashboard
Navigate to: `http://localhost:5173/admin/dashboard`

## Dashboard Features

### Statistics Panel
- **Total Orders** - All orders ever placed
- **Pending** - Orders waiting for confirmation
- **Confirmed** - Orders being prepared
- **Shipped** - Orders in transit
- **Delivered** - Successfully delivered orders
- **Revenue** - Total revenue from all orders

### Search & Filter
- **Search Bar** - Find orders by:
  - Order ID
  - Customer Name
  - Email Address
  - Phone Number

- **Status Filter** - Show orders by status:
  - All Status
  - Pending
  - Confirmed
  - Shipped
  - Delivered
  - Cancelled

### Order Actions

#### View Order Details
1. Click the "Eye" icon on any order
2. See full order information:
   - Customer details
   - Shipping address
   - Item breakdown
   - Total cost calculation
   - Current status
   - Tracking number (if set)

#### Update Order Status
1. Click the "Edit" icon on any order
2. Change status in the dropdown
3. Add tracking number (optional)
4. Click "Update Order"
5. Changes sync automatically to Google Sheets

## Order Status Guide

| Status | Action | When |
|--------|--------|------|
| Pending | Review and confirm | Order just received |
| Confirmed | Prepare shipment | Order approved for fulfillment |
| Shipped | Add tracking | Order dispatched from warehouse |
| Delivered | Confirm receipt | Order reached customer |
| Cancelled | | If customer cancels order |

## Google Sheets Integration

### Auto-Sync Features
- ✅ Orders automatically added to Google Sheet
- ✅ Status updates sync to Sheet
- ✅ Tracking numbers updated in Sheet
- ✅ All order details recorded

### Sheet Columns
| Column | Data |
|--------|------|
| A | Order ID |
| B | Order Date |
| C | Customer Name |
| D | Email |
| E | Phone |
| F | Full Address |
| G | Items Summary |
| H | Subtotal |
| I | Discount % |
| J | Discount Amount |
| K | Total |
| L | Status |
| M | Tracking Number |
| N | Notes |

## Tips & Tricks

### Finding Specific Orders
1. Use search for quick lookup
2. Use status filter to reduce visible orders
3. Orders are sorted by most recent first

### Batch Operations
- Update one order at a time
- Status changes are permanent (can update again if needed)

### Tracking Numbers
- Format: UPS, FedEx, DHL, etc. tracking codes
- Customers see this in their order tracking page
- Add when order ships

### Adding Notes
- Currently stored locally
- Use for internal comments

## Common Tasks

### Mark Order as Confirmed
1. Click Edit
2. Select "Confirmed" status
3. Click Update Order

### Add Tracking to Shipped Order
1. Click Edit
2. Select "Shipped" status
3. Enter tracking number (e.g., 1Z999AA10123456784)
4. Click Update Order

### View Today's Orders
1. Search for orders placed today
2. Or filter by Pending/Confirmed status

### Calculate Daily Revenue
1. Filter by date range in Google Sheet
2. Sum total column for that period

## Troubleshooting

### Can't Access Dashboard
- Check admin key is set: `localStorage.getItem('driptownAdminKey')`
- Should return: `ADMIN_DRIPTOWN_2024`

### Orders Not Showing
- Refresh the page
- Check localStorage for orders: `localStorage.getItem('driptownOrders')`

### Updates Not Syncing to Sheets
- Check if Google Sheets API is configured
- Check `.env.local` has `VITE_SHEET_ID` and `VITE_SHEETS_API_KEY`
- Check browser console for error messages

### Sheet Not Accessible
- Verify sheet exists and is public/shared correctly
- Check Sheet ID is correct in .env.local
- Verify Google Sheets API is enabled in Google Cloud

## Security Notes

**Current Setup**: Uses localStorage for admin authentication (development only)

**For Production**:
- Implement proper user authentication system
- Use secure session tokens
- Add password protection
- Consider role-based access control
- Never expose API keys in frontend for production

## Keyboard Shortcuts

Coming soon - currently use mouse/touch

## Data Export

To export orders from Google Sheet:
1. Open your Google Sheet
2. File → Download → CSV (.csv)
3. Import into Excel/Google Sheets for analysis

## Support

For setup help: See `/docs/GOOGLE_SHEETS_SETUP.md`
For API issues: Check `src/app/utils/sheetsAPI.ts`
