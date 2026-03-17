import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getProductsByCategory } from "../data/products";

export default function Accessories() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const categories = [
    {
      name: "Socks",
      slug: "socks",
      description: "Premium cotton blend socks for everyday comfort",
      count: getProductsByCategory("socks").length,
    },
    {
      name: "Stockings",
      slug: "stockings",
      description: "Fashion-forward stockings with luxury materials",
      count: getProductsByCategory("stockings").length,
    },
    {
      name: "Riding Gear",
      slug: "riding",
      description: "Essential gear for urban riders",
      count: getProductsByCategory("riding").length,
    },
    {
      name: "Mufflers",
      slug: "mufflers",
      description: "Luxury winter accessories",
      count: getProductsByCategory("mufflers").length,
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl mb-6 tracking-tight">
            Accessories
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Complete your look with our curated selection of premium accessories
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.button
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/category/${category.slug}`)}
              className="group relative overflow-hidden bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-8 text-left hover:bg-[var(--bg-soft)] hover:border-[var(--border-soft)] transition-all duration-300"
            >
              <div className="relative z-10">
                <h3 className="text-3xl mb-3">{category.name}</h3>
                <p className="text-white/60 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">
                    {category.count} {category.count === 1 ? "Product" : "Products"}
                  </span>
                  <span className="text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </div>
              </div>
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
