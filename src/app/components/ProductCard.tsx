import { memo } from "react";
import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import { Product } from "../data/products";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer transform transition [will-change:transform] hover:-translate-y-1"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-[rgba(255,255,255,0.15)] group-hover:shadow-lg">
        {/* Image Container */}
        <div className="aspect-square overflow-hidden relative">
          <ImageWithFallback
            src={product.packSizeImages?.[`${product.colors?.[0]}-${product.packSizes?.[0]}`] || product.colorImages?.[product.colors?.[0] || ""] || product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic
            }}
            className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col h-40">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-white/80 transition-colors line-clamp-2 h-14">
            {product.name}
          </h3>
          <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              ₹{product.price}
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
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
