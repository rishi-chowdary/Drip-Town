import { motion } from "motion/react";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "https://instagram.com/driptown" },
    { icon: Twitter, label: "Twitter", url: "https://twitter.com/driptown" },
    { icon: Facebook, label: "Facebook", url: "https://facebook.com/driptown" },
    { icon: Youtube, label: "YouTube", url: "https://youtube.com/driptown" },
  ];

  const shopLinks = [
    { name: "Headwear", path: "/category/headwear" },
    { name: "Smoking", path: "/category/smoking" },
    { name: "Accessories", path: "/accessories" },
    { name: "Socks", path: "/category/socks" },
    { name: "Riding Gear", path: "/category/riding" },
  ];

  const supportLinks = [
    { name: "Contact Us", path: "/contact" },
    { name: "About Us", path: "/about" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "Refund & Cancellation", path: "/refund-policy" },
  ];

  const legalLinks = [
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
  ];

  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl tracking-wider mb-4 roger-dropline font-bold">
              DRIPTOWN
            </h3>
            <p className="text-white/60 mb-6 max-w-xs">
              Premium streetwear accessories crafted for those who appreciate minimalist luxury and timeless style.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white mb-4">Customer Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl mb-2">Stay Updated</h4>
            <p className="text-white/60 mb-6 text-sm">
              Subscribe to get exclusive offers, new arrivals, and style inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </motion.button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          <p>© 2026 DripTown. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Premium Streetwear Accessories | Minimal Luxury Design
          </p>
        </div>
      </div>
    </footer>
  );
}
