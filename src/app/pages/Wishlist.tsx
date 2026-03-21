import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Star, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  inStock: boolean;
}

export default function Wishlist() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API based on user ID
    // For now, show empty state to encourage adding items
    if (user) {
      setWishlistItems([]);
    }
  }, [user]);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (item: WishlistItem) => {
    // Create a product object that matches the Product interface
    const product = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      category: item.category,
      subcategory: item.category.toLowerCase(),
      colors: [],
      packSizes: [],
      packSizeImages: {},
      packSizePrices: {},
      description: `${item.name} - ${item.category}`,
      rating: item.rating,
      inStock: item.inStock
    };
    addToCart(product, 1);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item.id);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-white/60">You need to be logged in to view your wishlist.</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-white/60">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 mx-auto mb-4 text-white/20" />
            <h2 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h2>
            <p className="text-white/60 mb-6">Start adding items you love to your wishlist!</p>
            <Link
              to="/"
              className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors group"
              >
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-red-500/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-white/60">{item.rating}</span>
                    </div>
                  </div>

                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-white/80 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">₹{item.price.toLocaleString()}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-white/60 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {item.inStock ? (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex items-center gap-2 bg-white/20 text-white/60 px-4 py-2 rounded-lg font-semibold cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Wishlist Tips */}
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Wishlist Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">💝 Save for Later</h3>
                <p className="text-white/60 text-sm">Keep track of items you're interested in for future purchases.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">🛒 Quick Add to Cart</h3>
                <p className="text-white/60 text-sm">Move items directly from wishlist to cart with one click.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">📱 Share Your Style</h3>
                <p className="text-white/60 text-sm">Share your wishlist with friends for style inspiration.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">🔔 Price Alerts</h3>
                <p className="text-white/60 text-sm">Get notified when your wishlist items go on sale.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}