import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { ChevronDown, ChevronUp, Search, Phone, Mail, MessageCircle, MapPin, Truck, RefreshCw, CreditCard, Shield, HelpCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'Track Orders' section. You'll see real-time updates on your order status, shipping information, and estimated delivery date.",
    category: "Orders"
  },
  {
    id: "2",
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all items. Items must be unused, in original packaging, and with all tags attached. Returns are processed within 5-7 business days after we receive your item.",
    category: "Returns"
  },
  {
    id: "3",
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days within India. Express shipping is available for 1-2 business days. International shipping takes 7-14 business days depending on the destination.",
    category: "Shipping"
  },
  {
    id: "4",
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees and import duties are the responsibility of the recipient.",
    category: "Shipping"
  },
  {
    id: "5",
    question: "How do I apply a coupon code?",
    answer: "During checkout, you'll see a 'Have a coupon?' section. Enter your coupon code there and click 'Apply'. The discount will be automatically applied to your order total.",
    category: "Payment"
  },
  {
    id: "6",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets including Paytm, PhonePe, and Google Pay. Cash on delivery is available for select locations.",
    category: "Payment"
  },
  {
    id: "7",
    question: "Can I modify my order after placing it?",
    answer: "Orders can be modified within 1 hour of placement. Please contact our customer support immediately. Once the order is processed for shipping, modifications are not possible.",
    category: "Orders"
  },
  {
    id: "8",
    question: "What if I receive a damaged item?",
    answer: "If you receive a damaged item, please contact us within 48 hours with photos of the damage. We'll arrange for a replacement or full refund at no extra cost.",
    category: "Returns"
  },
  {
    id: "9",
    question: "How do I change my account information?",
    answer: "You can update your account information by going to your profile settings. You can change your name, email, password, and manage your saved addresses and payment methods.",
    category: "Account"
  },
  {
    id: "10",
    question: "Are my payment details secure?",
    answer: "Yes, all payment information is encrypted and processed through secure gateways. We use industry-standard SSL encryption and comply with PCI DSS security standards.",
    category: "Security"
  }
];

const categories = ["All", "Orders", "Shipping", "Returns", "Payment", "Account", "Security"];

export default function HelpCentre() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Help Centre</h1>
          <p className="text-white/60 text-lg">Find answers to common questions or get in touch with our support team</p>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-6 hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <div>
                    <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded mr-3">
                      {faq.category}
                    </span>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-white/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-white/20" />
              <p className="text-white/60">No FAQs found matching your search.</p>
            </div>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Still Need Help?</h2>
          <p className="text-white/60 text-center mb-8">Our support team is here to help you 24/7</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-white/60 text-sm mb-2">Mon-Sun: 9AM-9PM IST</p>
              <p className="font-mono text-sm">+91 98765 43210</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-white/60 text-sm mb-2">Response within 24hrs</p>
              <p className="font-mono text-sm">support@driptown.com</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-white/60 text-sm mb-2">Available 24/7</p>
              <button className="text-sm bg-white text-black px-3 py-1 rounded hover:bg-white/90 transition-colors">
                Start Chat
              </button>
            </div>

            <div className="text-center">
              <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Store Locator</h3>
              <p className="text-white/60 text-sm mb-2">Find nearest store</p>
              <button className="text-sm bg-white text-black px-3 py-1 rounded hover:bg-white/90 transition-colors">
                Find Store
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
            <Truck className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <h3 className="font-semibold mb-1">Track Order</h3>
            <p className="text-white/60 text-sm">Monitor your delivery</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
            <RefreshCw className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <h3 className="font-semibold mb-1">Return Item</h3>
            <p className="text-white/60 text-sm">Easy return process</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <h3 className="font-semibold mb-1">Report Issue</h3>
            <p className="text-white/60 text-sm">Get help with problems</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}