# Google Sheets Integration Guide

This guide will help you set up Google Sheets to automatically receive and manage orders from the DripTown admin dashboard.

## Overview

The system automatically syncs all orders to a Google Sheet with the following features:
- **Automatic order logging** - Every new order is added to the sheet
- **Order management** - Admin can update order status and tracking numbers
- **Real-time sync** - Orders appear in both the app and Google Sheets
- **Local fallback** - Orders are stored locally even without Sheets configuration

## Prerequisites

- Google Account
- Google Cloud Project (or create a new one)
- Access to Google Sheets API

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter project name (e.g., "DripTown Orders")
5. Click "CREATE"

## Step 2: Enable Google Sheets API

1. In the Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "ENABLE"

## Step 3: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "API Key"
3. Copy the API key - you'll need this later
4. (Recommended) Click the pencil icon to restrict the key to only Google Sheets API

## Step 4: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create a new spreadsheet"
3. Name it "DripTown Orders" (or your preferred name)
4. Look at the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/...`
5. Copy the `SHEET_ID` - you'll need this later

## Step 5: Set Up Sheet Headers

The system will automatically create headers, but you can set them manually for reference:

Create columns with these headers (Headers are auto-created on first sync):
- A: Order ID
- B: Date
- C: Customer Name
- D: Email
- E: Phone
- F: Address
- G: Subtotal
- H: Discount (%)
- I: Discount Amount
- J: Total
- K: Status
- L: Tracking Number
- M: Notes

## Step 6: Update Environment Variables

1. Copy `.env.example` to `.env.local`
2. Add your Google Sheets credentials:

```env
VITE_SHEET_ID=your_sheet_id_from_step_4
VITE_SHEETS_API_KEY=your_api_key_from_step_3
```

3. Save the file

## Step 7: Test the Integration

1. Start your development server
2. Go to checkout and place a test order
3. Check if the order appears in your Google Sheet
4. The order should appear automatically within a few seconds

## Admin Dashboard Access

Access the admin dashboard at: `/admin/dashboard`

**Security Note**: Currently the dashboard checks for an admin key in localStorage. To set yourself as admin:

In browser console, run:
```javascript
localStorage.setItem('driptownAdminKey', 'ADMIN_DRIPTOWN_2024');
```

Then reload and navigate to `/admin/dashboard`.

## Admin Dashboard Features

### View Orders
- See all orders in a table format
- Filter by status (Pending, Confirmed, Shipped, Delivered, Cancelled)
- Search by Order ID, Customer Name, Email, or Phone

### Order Statistics
- Total Orders count
- Breakdown by status
- Total Revenue

### Manage Orders
- Click "View" to see full order details
- Click "Edit" to update order status
- Add tracking numbers for shipped orders
- Updates automatically sync to Google Sheets

## Order Statuses

- **Pending** - Order received, awaiting confirmation
- **Confirmed** - Order confirmed, being prepared
- **Shipped** - Order has been shipped
- **Delivered** - Order delivered to customer
- **Cancelled** - Order cancelled

## Troubleshooting

### Orders Not Appearing in Sheet
1. Check that `VITE_SHEET_ID` is correct
2. Check that `VITE_SHEETS_API_KEY` is correct
3. Make sure the Sheet is shared with the service account (if using, though direct API key should work)
4. Check browser console for API errors

### API Key Errors
1. Go to Google Cloud Console
2. Verify the API key is enabled for Google Sheets API
3. Check the key hasn't been accidentally rotated

### If You Don't Have Google Sheets Configured
The system will fall back to local storage. Orders will be stored in `localStorage['driptownOrders']` and will still appear in the admin dashboard. You can configure Google Sheets later without losing any data.

## Secure Deployment Note

For production:
- Use environment variables securely (never commit `.env.local`)
- Consider using a backend service to handle Google Sheets API calls instead of exposing the API key in the frontend
- Implement proper admin authentication
- Use a better method than localStorage for admin key storage

## API Rate Limits

Google Sheets API has rate limits:
- Quotas can be viewed in Google Cloud Console
- Free tier allows sufficient requests for small to medium businesses
- Monitor usage in Cloud Console if you have high order volume

## Support

For issues with:
- Google Cloud setup: Check [Google Cloud Documentation](https://cloud.google.com/docs)
- Google Sheets API: Check [Sheets API Documentation](https://developers.google.com/sheets/api)
- DripTown integration: See `sheetsAPI.ts` in `src/app/utils/`
