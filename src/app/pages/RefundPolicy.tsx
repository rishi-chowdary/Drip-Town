import { motion } from "motion/react";
import { useEffect } from "react";

export default function RefundPolicy() {
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
          <h1 className="text-5xl mb-6">Refund & Cancellation Policy</h1>
          <p className="text-white/60 mb-12">Last updated: March 16, 2026</p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl mb-4 text-white">1. Order Cancellation</h2>
              <p className="mb-3">
                You may cancel your order within 24 hours of placement for a full refund, provided the order has not been shipped.
              </p>
              <p>
                To cancel an order, please contact our customer service team at support@driptown.com with your order number.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">2. Return Eligibility</h2>
              <p className="mb-3">
                Products may be returned within 30 days of delivery if they meet the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Items are unused and in original condition</li>
                <li>Original tags and packaging are intact</li>
                <li>Proof of purchase is provided</li>
                <li>Items are not personalized or custom-made</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">3. Non-Returnable Items</h2>
              <p className="mb-3">The following items cannot be returned:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Intimate apparel (socks, stockings) for hygiene reasons</li>
                <li>Sale or clearance items marked as final sale</li>
                <li>Gift cards or vouchers</li>
                <li>Products damaged due to misuse or negligence</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">4. Return Process</h2>
              <p className="mb-3">To initiate a return:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact our customer service team at support@driptown.com</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive a Return Authorization (RA) number</li>
                <li>Pack the item securely with the RA number clearly marked</li>
                <li>Ship the item to the address provided</li>
              </ol>
              <p className="mt-3">
                Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">5. Refund Processing</h2>
              <p className="mb-3">
                Once we receive and inspect your returned item:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are processed within 5-7 business days</li>
                <li>Refunds are issued to the original payment method</li>
                <li>Shipping charges are non-refundable (except for defective items)</li>
                <li>You will receive an email confirmation when the refund is processed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">6. Exchanges</h2>
              <p>
                We offer exchanges for different sizes or colors of the same product, subject to availability. To request an exchange, contact our customer service team. If the desired item is unavailable, we will process a refund instead.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">7. Defective or Damaged Items</h2>
              <p className="mb-3">
                If you receive a defective or damaged item:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact us within 7 days of delivery</li>
                <li>Provide photos of the defect or damage</li>
                <li>We will arrange for a replacement or full refund at no cost to you</li>
                <li>Return shipping will be covered by DripTown</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">8. Lost or Stolen Packages</h2>
              <p>
                DripTown is not responsible for packages marked as delivered by the carrier. We recommend contacting the shipping carrier directly for assistance with lost or stolen packages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">9. International Returns</h2>
              <p>
                International customers are responsible for all return shipping costs and any customs fees incurred. Refunds will be processed in USD.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">10. Contact Us</h2>
              <p>
                For any questions regarding returns, refunds, or cancellations, please contact our customer service team:
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
