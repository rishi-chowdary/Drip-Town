import { OrderData } from "../utils/sheetsAPI";
import { Printer, QrCode } from "lucide-react";

interface DispatchSlipProps {
  order: OrderData;
}

export default function DispatchSlip({ order }: DispatchSlipProps) {
  const handlePrint = () => {
    window.print();
  };

  // Generate QR code URL using QR Server API
  // Encodes the order ID for easy scanning
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(order.id)}`;

  return (
    <div className="bg-white text-black p-8 rounded-lg">
      {/* Print Button (hidden in print) */}
      <div className="no-print mb-6 flex justify-end">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Printer className="w-4 h-4" />
          Print Dispatch Slip
        </button>
      </div>

      {/* Dispatch Slip Content */}
      <div className="border-2 border-black p-8 space-y-6">
        {/* Header with QR Code */}
        <div className="flex items-start justify-between border-b-2 border-black pb-4">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold">DISPATCH SLIP</h1>
            <p className="text-sm text-gray-600">DripTown Order Fulfillment</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img 
              src={qrCodeUrl} 
              alt="Order QR Code" 
              className="w-32 h-32 border-2 border-black"
            />
            <p className="text-xs font-semibold">Scan to track</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-3 gap-6">
          <div className="border border-black p-3">
            <p className="text-sm font-semibold text-gray-600">ORDER ID</p>
            <p className="text-xl font-bold break-all font-mono">{order.id}</p>
          </div>
          <div className="border border-black p-3">
            <p className="text-sm font-semibold text-gray-600">ORDER DATE</p>
            <p className="text-lg font-bold">
              {new Date(order.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="border border-black p-3">
            <p className="text-sm font-semibold text-gray-600">STATUS</p>
            <p className="text-lg font-bold">{order.status.toUpperCase()}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="border-2 border-black p-4 space-y-3">
          <h2 className="text-lg font-bold border-b border-black pb-2">
            CUSTOMER INFORMATION
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-600">NAME</p>
              <p className="text-lg font-bold">{order.customerName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">MOBILE</p>
              <p className="text-lg font-bold">{order.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">EMAIL</p>
              <p className="text-sm font-mono break-all">{order.email}</p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="border-2 border-black p-4 space-y-2">
          <h2 className="text-lg font-bold border-b border-black pb-2">
            DELIVERY ADDRESS
          </h2>
          <div className="space-y-1 text-base font-semibold">
            <p>{order.address}</p>
            <p>
              {order.city}, {order.state} {order.zipCode}
            </p>
            <p>{order.country}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="border-2 border-black p-4 space-y-3">
          <h2 className="text-lg font-bold border-b border-black pb-2">
            ORDER ITEMS
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="border border-black p-2 text-left font-bold">
                  PRODUCT NAME
                </th>
                <th className="border border-black p-2 text-center font-bold">
                  QTY
                </th>
                <th className="border border-black p-2 text-left font-bold">
                  SPECS
                </th>
                <th className="border border-black p-2 text-right font-bold">
                  PRICE
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b border-black">
                  <td className="border border-black p-2 font-semibold">
                    {item.name}
                  </td>
                  <td className="border border-black p-2 text-center font-bold text-lg">
                    {item.quantity}
                  </td>
                  <td className="border border-black p-2 text-sm">
                    {item.color && <p>Color: {item.color}</p>}
                    {item.size && <p>Size: {item.size}</p>}
                  </td>
                  <td className="border border-black p-2 text-right font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price Summary */}
        <div className="border-2 border-black p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-base">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-semibold">₹{order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-base">
                <span className="font-semibold">Discount ({order.discount}%):</span>
                <span className="font-semibold">-₹{order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t-2 border-black pt-2">
              <span>TOTAL:</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Tracking Info (if available) */}
        {order.trackingNumber && (
          <div className="border-2 border-black p-4">
            <p className="text-sm font-semibold text-gray-600">TRACKING NUMBER</p>
            <p className="text-2xl font-bold font-mono">{order.trackingNumber}</p>
          </div>
        )}

        {/* Footer with Additional QR Code */}
        <div className="border-t-2 border-black pt-4 flex items-center justify-between">
          <div className="flex-1">
            <p className="font-semibold">DripTown - Order Management System</p>
            <p className="text-gray-600 text-sm">
              Printed on {new Date().toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <img 
              src={qrCodeUrl} 
              alt="Order QR Code Footer" 
              className="w-24 h-24 border-2 border-black"
            />
            <p className="text-xs font-semibold text-center">{order.id}</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .no-print {
            display: none;
          }
          .bg-white {
            background: white !important;
            padding: 0 !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
