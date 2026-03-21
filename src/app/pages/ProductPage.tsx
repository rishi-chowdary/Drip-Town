import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { getProductById, products } from "../data/products";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || ""
  );
  const [selectedPackSize, setSelectedPackSize] = useState<string>(
    product?.packSizes?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-white/60 hover:text-white transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] ${
                  imageZoom ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setImageZoom(!imageZoom)}
              >
                <motion.div
                  animate={{ scale: imageZoom ? 1.5 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square"
                >
                  <ImageWithFallback
                    src={product.packSizeImages?.[`${selectedColor}-${selectedPackSize}`] || product.colorImages?.[selectedColor] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <p className="text-white/40 text-sm text-center mt-4">
                Click image to zoom
              </p>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white/80 mb-4">
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-6">
                  ₹{product.packSizePrices?.[selectedPackSize] || product.price}
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">
                    Color: {selectedColor}
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-white scale-110"
                            : "border-white/20"
                        }`}
                        style={{
                          background:
                            color === "Black"
                              ? "#000"
                              : color === "White"
                              ? "#fff"
                              : color === "Grey"
                              ? "#6b7280"
                              : color === "Dark Grey"
                              ? "#3f3f46"
                              : color === "Navy" || color === "Navy Blue"
                              ? "#001f3f"
                              : color === "Purple"
                              ? "#a855f7"
                              : color === "Chrome" || color === "Silver"
                              ? "linear-gradient(135deg, #ffffff, #9e9e9e, #1a1a1a)"
                              : color === "Gold"
                              ? "#fbbf24"
                              : color === "Brown"
                              ? "#8B4513"
                              : color === "Multi" || color === "Mixed"
                              ? "linear-gradient(135deg, #ffffff, #9e9e9e, #1a1a1a)"
                              : color === "Beluga"
                              ? "#2d2d2d"
                              : color === "Graphite Grey"
                              ? "#484848"
                              : color === "Sky Blue"
                              ? "#87CEEB"
                              : color === "Red"
                              ? "#DC143C"
                              : color === "Green"
                              ? "#228B22"
                              : color === "Pink"
                              ? "#ff69b4"
                              : color === "Tan"
                              ? "#d2b48c"
                              : color === "Blue"
                              ? "#4169E1"
                              : "#fff",
                        }}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check
                              className={`w-6 h-6 ${
                                color === "White" ? "text-black" : "text-white"
                              }`}
                            />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pack Size Selection */}
              {product.packSizes && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">
                    Pack Size: {selectedPackSize}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.packSizes.map((packSize) => (
                      <motion.button
                        key={packSize}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPackSize(packSize)}
                        className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
                          selectedPackSize === packSize
                            ? "border-white bg-white/20 text-white"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        {packSize} - ₹{product.packSizePrices?.[packSize] || product.price}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">
                    Size: {selectedSize}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
                          selectedSize === size
                            ? "border-white bg-white/20 text-white"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-white to-white/80 rounded-xl text-black font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-white/50 transition-all relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.div
                        key="added"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Added to Cart!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="add"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all"
                >
                  <Heart className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--border-soft)] transition"
                  >
                    <feature.icon className="w-8 h-8 text-white mb-2" />
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/60">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-black/50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}