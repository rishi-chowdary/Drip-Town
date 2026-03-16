import { motion } from "motion/react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, discount, applyCoupon } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    setCouponMessage(result.message);
    setCouponError(!result.success);
    if (result.success) {
      setCouponCode("");
    }
    setTimeout(() => setCouponMessage(""), 3000);
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-white/20" />
            <h1 className="text-4xl mb-4">Your Cart is Empty</h1>
            <p className="text-white/60 mb-8">
              Add some products to get started
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl mb-2">Shopping Cart</h1>
          <p className="text-white/60">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-6 flex gap-6 hover:border-[var(--border-soft)] transition"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-xl mb-2">{item.name}</h3>
                  <div className="text-sm text-white/60 space-y-1 mb-4">
                    {item.selectedColor && (
                      <div>Color: {item.selectedColor}</div>
                    )}
                    {item.selectedSize && (
                      <div>Size: {item.selectedSize}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white/10 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white/10 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xl">${item.price * item.quantity}</div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-6 sticky top-32 hover:border-[var(--border-soft)] transition">
              <h2 className="text-2xl mb-6">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm mb-2 text-white/80">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="border border-[var(--border-soft)] text-white px-6 py-3 rounded-lg hover:bg-white/10 transition"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm mt-2 ${couponError ? "text-white/60" : "text-white"}`}
                  >
                    {couponMessage}
                  </motion.p>
                )}
              </div>

              {/* Active Offers */}
              <div className="mb-6 p-4 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg hover:border-[var(--border-soft)] transition">
                <h3 className="text-sm mb-3 text-white/80">Available Offers</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <div>• DRIP10 - 10% off</div>
                  <div>• DRIP20 - 20% off</div>
                  <div>• WELCOME25 - 25% off</div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-white/80">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-2xl mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/checkout")}
                className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <button
                onClick={() => navigate("/")}
                className="border border-[var(--border-soft)] text-white px-6 py-3 rounded-lg hover:bg-white/10 transition"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
