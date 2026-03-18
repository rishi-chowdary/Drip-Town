import { memo } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import { Product } from "../data/products";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function ProductCard({ product, index = 0 }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] backdrop-blur-sm border border-[var(--border-main)] transition-all duration-300 group-hover:border-[var(--border-soft)] group-hover:shadow-2xl group-hover:shadow-white/20" style={{ willChange: 'transform' }}>
        {/* Image Container */}
        <div className="aspect-square overflow-hidden relative">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          
          {/* Quick Add Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic
            }}
            className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-white to-white/80 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-white/80 transition-colors">
            {product.name}
          </h3>
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.colors && (
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white/20"
                    style={{
                      background:
                        color === "Black"
                          ? "#000"
                          : color === "White"
                          ? "#fff"
                          : color === "Grey"
                          ? "#6b7280"
                          : color === "Navy"
                          ? "#1e3a8a"
                          : color === "Purple"
                          ? "#a855f7"
                          : color === "Grey"
                          ? "#9e9e9e"
                          : color === "Chrome" || color === "Silver"
                          ? "linear-gradient(135deg, #ffffff, #9e9e9e, #1a1a1a)"
                          : color === "Gold"
                          ? "#fbbf24"
                          : color === "Brown"
                          ? "#92400e"
                          : color === "Multi" || color === "Mixed"
                          ? "linear-gradient(135deg, #ffffff, #9e9e9e, #1a1a1a)"
                          : "#fff",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ProductCard);
