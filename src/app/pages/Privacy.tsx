import { motion } from "motion/react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-6">Privacy Policy</h1>
          <p className="text-white/60 mb-12">Last updated: March 16, 2026</p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl mb-4 text-white">1. Information We Collect</h2>
              <p className="mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through our payment gateway)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and our products</li>
                <li>Improve our website and services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Detect and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">3. Information Sharing</h2>
              <p className="mb-3">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in our operations (e.g., payment processors, shipping companies)</li>
                <li>Law enforcement when required by law</li>
                <li>Other parties with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">4. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">7. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at privacy@driptown.com or by mail at:
              </p>
              <p className="mt-3">
                DripTown<br />
                123 Street Style Ave<br />
                Fashion District, NY 10001
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
