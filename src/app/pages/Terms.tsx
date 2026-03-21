import { motion } from "motion/react";
import { useEffect } from "react";

export default function Terms() {
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
          <h1 className="text-5xl mb-6">Terms and Conditions</h1>
          <p className="text-white/60 mb-12">Last updated: March 16, 2026</p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl mb-4 text-white">1. Agreement to Terms</h2>
              <p>
                By accessing and using DripTown's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">2. Products and Services</h2>
              <p className="mb-3">
                DripTown offers premium streetwear accessories including headgear, smokn accessories, socks, belts, riding gear, and mufflers.
              </p>
              <p>
                We reserve the right to modify, discontinue, or limit the availability of any product at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">3. Pricing and Payment</h2>
              <p className="mb-3">
                All prices are displayed in INR and are subject to change without notice. We accept various payment methods through our integrated payment gateway.
              </p>
              <p>
                Payment must be received in full before products are shipped. We reserve the right to refuse or cancel any order for any reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">4. User Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">5. Intellectual Property</h2>
              <p>
                All content on the DripTown website, including but not limited to text, graphics, logos, images, and software, is the property of DripTown and is protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">6. Prohibited Uses</h2>
              <p className="mb-3">You may not use our website for any unlawful purpose or to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Engage in any fraudulent activity</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">7. Limitation of Liability</h2>
              <p>
                DripTown shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">8. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which DripTown operates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-white">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at legal@driptown.com.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
