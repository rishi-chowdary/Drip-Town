import { motion } from "motion/react";
import { useEffect } from "react";

export default function ShippingPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-6">Shipping Policy</h1>
          <p className="text-white/60 mb-12">Last updated: March 16, 2026</p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl mb-4 text-white">1. Processing Time</h2>
              <p className="mb-3">
                All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email.
              </p>
              <p>
                Orders placed after 2:00 PM EST will be processed the next business day.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">2. Domestic Shipping (USA)</h2>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg text-white mb-2">Standard Shipping</h3>
                  <p className="text-sm mb-1">Delivery: 5-7 business days</p>
                  <p className="text-sm">Cost: $5.99 (FREE on orders over $75)</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-4 hover:border-[var(--border-soft)] transition">
                  <h3 className="text-lg text-white mb-2">Express Shipping</h3>
                  <p className="text-sm mb-1">Delivery: 2-3 business days</p>
                  <p className="text-sm">Cost: $12.99</p>
                </div>
                <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-4 hover:border-[var(--border-soft)] transition">
                  <h3 className="text-lg text-white mb-2">Overnight Shipping</h3>
                  <p className="text-sm mb-1">Delivery: 1 business day</p>
                  <p className="text-sm">Cost: $24.99</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">3. International Shipping</h2>
              <p className="mb-3">
                We currently ship to select international destinations. Shipping costs and delivery times vary by location:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Canada: 7-14 business days, starting at $15.99</li>
                <li>UK & Europe: 10-21 business days, starting at $24.99</li>
                <li>Australia & New Zealand: 14-28 business days, starting at $29.99</li>
                <li>Asia: 14-28 business days, starting at $29.99</li>
              </ul>
              <p className="mt-3">
                International customers are responsible for all customs duties, taxes, and fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">4. Order Tracking</h2>
              <p>
                Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can track your package using the carrier's website or through your DripTown account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">5. Shipping Restrictions</h2>
              <p className="mb-3">
                We do not ship to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>PO Boxes or APO/FPO addresses (domestic express/overnight only)</li>
                <li>Certain remote or rural locations</li>
                <li>Countries under trade restrictions or embargoes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">6. Delivery Issues</h2>
              <p className="mb-3">
                If you experience any delivery issues:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lost packages: Contact us if your tracking shows delivered but you haven't received it</li>
                <li>Delayed packages: Check with the carrier first, then contact us if needed</li>
                <li>Incorrect address: We are not responsible for orders shipped to incorrect addresses provided by the customer</li>
                <li>Refused packages: Return shipping fees will be deducted from your refund</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">7. Multiple Item Orders</h2>
              <p>
                If you order multiple items, they may ship separately. You will receive tracking information for each shipment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">8. Address Changes</h2>
              <p>
                Address changes can only be made before an order is shipped. Once shipped, we cannot modify the delivery address. Please contact us immediately at support@driptown.com if you need to change your shipping address.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">9. Shipping Carriers</h2>
              <p>
                We partner with trusted carriers including USPS, UPS, FedEx, and DHL to ensure safe and timely delivery of your orders.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">10. Holiday Shipping</h2>
              <p>
                During peak holiday seasons, processing and shipping times may be extended. We recommend placing orders early to ensure timely delivery. Specific holiday shipping deadlines will be posted on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">11. Contact Us</h2>
              <p>
                For shipping inquiries, please contact:
              </p>
              <p className="mt-3">
                Email: support@driptown.com<br />
                Phone: +1 (555) 123-4567<br />
                Hours: Monday-Friday, 9:00 AM - 6:00 PM EST
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
