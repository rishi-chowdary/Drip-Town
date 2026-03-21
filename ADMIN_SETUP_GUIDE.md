# Admin Dashboard & Order Management - Quick Start

## What's New? ✨

Your DripTown app now has a **complete Admin Dashboard & Order Management System** that:
- ✅ Tracks all customer orders in real-time
- ✅ Automatically syncs orders to Google Sheets
- ✅ Allows you to manage order status (pending → shipped → delivered)
- ✅ Includes tracking number management
- ✅ Shows analytics and revenue metrics
- ✅ Falls back to localStorage if Google Sheets is unavailable

## 🚀 Quick Start (5 minutes)

### 1. Enable Admin Access
Open your browser console (Press `F12`, go to Console tab) and run:
```javascript
localStorage.setItem('driptownAdminKey', 'ADMIN_DRIPTOWN_2024');
```

### 2. Access the Dashboard
Navigate to: `http://localhost:5173/admin/dashboard`

### 3. Done!
You should see your admin dashboard with order statistics and an empty orders table.

## 📊 What You Can Do

### View Orders
- See all orders in a searchable, filterable table
- Sort by status, date, or customer info
- View complete order details (click the eye icon)

### Manage Orders
- Update order status (Pending → Confirmed → Shipped → Delivered)
- Add tracking numbers for shipped orders
- Click the edit icon to update

### Analytics
- Total orders count
- Orders grouped by status
- Total revenue calculation
- Key metrics dashboard

## 📱 Admin Dashboard Features

**Stats Panel**: Shows 6 key metrics
- Total Orders
- Pending Orders
- Confirmed Orders
- Shipped Orders
- Delivered Orders
- Total Revenue (₹)

**Search & Filter**:
- Search by: Order ID, Customer Name, Email, Phone
- Filter by: Status (All, Pending, Confirmed, Shipped, Delivered, Cancelled)

**Order Actions**:
- 👁️ View full order details
- ✎ Edit status and tracking number

## 🔧 Optional: Google Sheets Integration

This is optional - the system works fine with just localStorage.

### To Enable Google Sheets:
1. Follow the complete setup guide: `docs/GOOGLE_SHEETS_SETUP.md`
2. Get API Key from Google Cloud Console
3. Get Sheet ID from your Google Sheet URL
4. Add to `.env.local`:
   ```env
   VITE_SHEET_ID=your_sheet_id
   VITE_SHEETS_API_KEY=your_api_key
   ```
5. Restart dev server
6. That's it! Orders now auto-sync to Sheets

### Without Google Sheets:
- Orders store in localStorage
- Everything still works
- No Google account needed
- No API setup required

## 📁 Files Changed/Created

### New Files:
- `src/app/utils/sheetsAPI.ts` - Google Sheets integration
- `src/app/pages/AdminDashboard.tsx` - Dashboard component
- `src/vite-env.d.ts` - TypeScript types
- `docs/GOOGLE_SHEETS_SETUP.md` - Setup guide
- `docs/ADMIN_DASHBOARD_GUIDE.md` - User manual
- `docs/ADMIN_ORDERS_SETUP.md` - Complete documentation

### Modified Files:
- `src/app/routes.tsx` - Added `/admin/dashboard` route
- `src/app/pages/Checkout.tsx` - Integrated order syncing
- `.env.example` - Added Google Sheets config

## 📊 How Orders Work

1. **Customer Places Order**
   - Fills checkout form
   - Clicks "Place Order"

2. **Order is Created**
   - Unique Order ID generated
   - Customer info & items & prices recorded
   - Status set to "Pending"

3. **Auto-Synced**
   - Sent to Google Sheets (if configured)
   - Stored in localStorage (always)
   - Shows in admin dashboard instantly

4. **Admin Updates Order**
   - Click edit on any order
   - Change status & add tracking
   - Click update
   - Changes sync back to Sheets

## 🔐 Admin Security

**Current (Development):**
- Admin key stored in localStorage
- Set with one console command
- Good for development/testing

**For Production:**
- Implement proper authentication
- Use secure session tokens
- Store admin keys on backend only
- See security notes in `docs/ADMIN_ORDERS_SETUP.md`

## ❓ Troubleshooting

### Can't Access Dashboard?
```javascript
// Check if admin key is set
localStorage.getItem('driptownAdminKey');
// Should return: ADMIN_DRIPTOWN_2024
```

### Orders Not Showing?
- Refresh the page
- Check localStorage: `localStorage.getItem('driptownOrders')`
- Check browser console for errors

### Google Sheets Not Syncing?
- Verify `.env.local` has correct Sheet ID & API Key
- Check API is enabled in Google Cloud Console
- See `docs/GOOGLE_SHEETS_SETUP.md` for details

## 📚 Documentation

- **Quick Start**: This file
- **Setup Guide**: `docs/GOOGLE_SHEETS_SETUP.md`
- **User Manual**: `docs/ADMIN_DASHBOARD_GUIDE.md`
- **Complete Docs**: `docs/ADMIN_ORDERS_SETUP.md`
- **Code**: `src/app/utils/sheetsAPI.ts`

## 🎯 Next Steps

### Immediately:
1. ✅ Set admin key (see above)
2. ✅ Access dashboard at `/admin/dashboard`
3. ✅ Test with a test order

### Soon:
1. Customize admin key (don't use default)
2. (Optional) Set up Google Sheets
3. Configure email notifications
4. Add order statuses to customer notification emails

### Later:
1. Implement proper authentication
2. Add multiple admin users
3. Add inventory tracking
4. Add return/refund management
5. Add customer notification emails on status change

## 💰 Features for Business

- **Revenue Tracking**: See total revenue at a glance
- **Order Pipeline**: Track orders through fulfillment stages
- **Performance Metrics**: Monitor order volume and status breakdown
- **Shipping Management**: Add tracking numbers for each order
- **Data Backup**: Orders stored both locally and in Google Sheets
- **Scalability**: System handles growing order volume

## ⚙️ Technical Details

### Order Data Structure
```typescript
{
  id: string;                    // Unique order ID
  date: string;                  // When ordered
  customerName: string;          // Full name
  email: string;                 // Email address
  phone: string;                 // Phone number
  address: string;               // Full address
  city: string;                  // City
  state: string;                 // State/Province
  zipCode: string;               // Postal code
  country: string;               // Country
  items: Array<{                 // Order items
    id: string;
    name: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }>;
  subtotal: number;              // Before discounts
  discount: number;              // Discount %
  discountAmount: number;        // Discount amount
  total: number;                 // Final price
  status: string;                // pending/confirmed/shipped/delivered/cancelled
  trackingNumber?: string;       // Shipping number
}
```

### Storage Locations
- **Primary**: Google Sheets (if configured)
- **Secondary**: localStorage (always)
- **Order Key**: `driptownOrders` in localStorage

## 🎓 API Reference

```typescript
// Sync order to sheets
syncOrderToSheets(order: OrderData)

// Get all orders
getOrdersFromSheets(): Promise<OrderData[]>

// Update order status
updateOrderStatusInSheets(orderId, status, trackingNumber?)

// Initialize sheet headers
initializeGoogleSheet()
```

## ✅ Validation Checklist

- [x] Admin dashboard component created
- [x] Order history storage implemented
- [x] Google Sheets integration ready
- [x] Checkout syncs orders
- [x] Search & filter working
- [x] Status updates working
- [x] Analytics dashboard showing
- [x] Documentation complete

## 🎉 You're All Set!

Your admin dashboard is ready to use. Start by:
1. Setting admin key
2. Visiting `/admin/dashboard`
3. Placing a test order to see it appear

For any questions, check the documentation files in `/docs/` folder.

**Happy order managing! 🎊**
