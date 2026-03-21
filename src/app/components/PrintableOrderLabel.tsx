import { OrderData } from "../utils/sheetsAPI";
import { Printer } from "lucide-react";

interface PrintableOrderLabelProps {
  order: OrderData;
}

export default function PrintableOrderLabel({ order }: PrintableOrderLabelProps) {
  const handlePrint = () => {
    window.print();
  };

  // QR Code URL from QRServer (100x100mm = ~295x295px at 72dpi)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=295x295&data=${encodeURIComponent(order.id)}`;

  // Generate barcode-like representation (CODE128 style using order ID)
  const generateBarcodeText = (text: string) => {
    // Simple barcode representation - vertical bars for readable format
    return text.split("").map((char, idx) => ({
      char,
      height: idx % 2 === 0 ? "short" : "tall",
    }));
  };

  const barcodeChars = generateBarcodeText(order.id.substring(0, 20));

  return (
    <div className="bg-white text-black p-4">
      {/* Print Button (hidden in print) */}
      <div className="no-print mb-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
        >
          <Printer className="w-4 h-4" />
          Print Label
        </button>
      </div>

      {/* Print multiple labels per page - 4 labels (2x2 layout) */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {[0, 1, 2, 3].map((labelNum) => (
          <div
            key={labelNum}
            className="border-2 border-black p-3 w-full aspect-square flex flex-col items-center justify-between print:page-break-inside-avoid"
            style={{
              width: "200px",
              height: "200px",
            }}
          >
            {/* Header with Order ID and basic info */}
            <div className="w-full text-center -mt-1">
              <p className="text-xs font-bold">ORDER ID</p>
              <p
                className="font-mono text-xs font-bold break-all leading-tight"
                style={{ fontSize: "8px" }}
              >
                {order.id}
              </p>
            </div>

            {/* Barcode representation */}
            <div className="flex items-end gap-0.5 h-8 my-1">
              {barcodeChars.slice(0, 15).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black mx-px"
                  style={{
                    width: "3px",
                    height: item.height === "tall" ? "28px" : "14px",
                  }}
                />
              ))}
            </div>

            {/* QR Code - 100x100mm equivalent */}
            <img
              src={qrCodeUrl}
              alt="Order QR Code"
              className="border border-black"
              style={{
                width: "100px",
                height: "100px",
              }}
            />

            {/* Product and customer info - compact */}
            <div className="text-center w-full -mb-1" style={{ fontSize: "7px" }}>
              <p className="font-bold truncate">
                {order.items[0]?.name || "Order"}
              </p>
              <p className="font-bold">
                Qty: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p className="truncate">{order.customerName.substring(0, 15)}</p>
              <p className="text-xs">
                {new Date(order.date).toLocaleDateString("en-IN")}
              </p>
            </div>

            {/* Status at bottom */}
            <div className="border-t border-black w-full text-center pt-0.5 -mb-1">
              <p className="text-xs font-bold">{order.status.toUpperCase()}</p>
            </div>
          </div>
        ))}
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
            padding: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
