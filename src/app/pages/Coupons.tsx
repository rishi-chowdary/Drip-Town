import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Gift, Copy, Check, Clock, Tag, Percent, ShoppingBag, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumPurchase?: number;
  maximumDiscount?: number;
  expiryDate: string;
  category: string;
  isActive: boolean;
  usedCount: number;
  maxUses?: number;
  isUsed: boolean;
}

export default function Coupons() {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API based on user ID
    // For now, show empty state - coupons would be earned through purchases or promotions
    if (user) {
      setCoupons([]);
    }
  }, [user]);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const getDiscountText = (coupon: Coupon) => {
    if (coupon.discountType === 'percentage') {
      return `${coupon.discountValue}% off`;
    }
    return `₹${coupon.discountValue} off`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Welcome': 'bg-green-500/20 text-green-400',
      'Category': 'bg-blue-500/20 text-blue-400',
      'Flash Sale': 'bg-red-500/20 text-red-400',
      'Loyalty': 'bg-purple-500/20 text-purple-400',
      'Seasonal': 'bg-orange-500/20 text-orange-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-white/60">You need to be logged in to view your coupons.</p>
        </div>
      </div>
    );
  }

  const activeCoupons = coupons.filter(coupon => coupon.isActive && !isExpired(coupon.expiryDate) && !coupon.isUsed);
  const expiredCoupons = coupons.filter(coupon => !coupon.isActive || isExpired(coupon.expiryDate) || coupon.isUsed);

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">My Coupons</h1>
          <p className="text-white/60">Exclusive discounts and offers available for you</p>
        </motion.div>

        {/* Active Coupons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Gift className="w-6 h-6" />
            Active Coupons ({activeCoupons.length})
          </h2>

          {activeCoupons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
            >
              <Gift className="w-12 h-12 mx-auto mb-4 text-white/20" />
              <p className="text-white/60 mb-4">No active coupons yet. Complete your first purchase to earn exclusive discounts!</p>
              <Link
                to="/"
                className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCoupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:border-white/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(coupon.category)}`}>
                          {coupon.category}
                        </span>
                        <span className="text-lg font-bold text-white">{getDiscountText(coupon)}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{coupon.title}</h3>
                      <p className="text-white/60 text-sm">{coupon.description}</p>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded font-mono text-sm font-semibold hover:bg-white/90 transition-colors"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            {coupon.code}
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-white/60">
                    {coupon.minimumPurchase && (
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Minimum purchase: ₹{coupon.minimumPurchase.toLocaleString()}</span>
                      </div>
                    )}
                    {coupon.maximumDiscount && (
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>Maximum discount: ₹{coupon.maximumDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</span>
                    </div>
                    {coupon.maxUses && (
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        <span>Used {coupon.usedCount} of {coupon.maxUses} times</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Expired/Used Coupons */}
        {expiredCoupons.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Expired & Used Coupons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expiredCoupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 opacity-60"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(coupon.category)}`}>
                          {coupon.category}
                        </span>
                        <span className="text-lg font-bold text-white/60">{getDiscountText(coupon)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white/60 mb-1">{coupon.title}</h3>
                      <p className="text-white/40 text-sm">{coupon.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/10 text-white/60 px-3 py-2 rounded font-mono text-sm">
                        {coupon.code}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-white/40">
                    {coupon.isUsed ? (
                      <span className="text-red-400">Already used</span>
                    ) : (
                      <span>Expired on {new Date(coupon.expiryDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* How to Use Coupons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">How to Use Coupons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">1. Copy Code</h3>
              <p className="text-white/60 text-sm">Click the copy button next to any active coupon code.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">2. Add to Cart</h3>
              <p className="text-white/60 text-sm">Add items to your cart that meet the coupon requirements.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">3. Apply at Checkout</h3>
              <p className="text-white/60 text-sm">Enter the coupon code in the checkout page.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">4. Enjoy Savings</h3>
              <p className="text-white/60 text-sm">Discount will be applied automatically to your order.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}