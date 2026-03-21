import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory, products as allProducts } from "../data/products";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const products = getProductsByCategory(category || "");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Get unique subcategories for the current category
  const getSubcategories = () => {
    const categoryProducts = allProducts.filter((p) => p.category === category);
    const subcats = [...new Set(categoryProducts
      .filter((p) => p.subcategory)
      .map((p) => p.subcategory))];
    return subcats;
  };

  const subcategories = getSubcategories();
  
  // Filter products by selected subcategory
  const filteredProducts = selectedSubcategory
    ? products.filter((p) => p.subcategory === selectedSubcategory)
    : products;

  useEffect(() => {
    setSelectedSubcategory(null);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [category]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [selectedSubcategory]);

  const categoryInfo: Record<
    string,
    { title: string; description: string; gradient: string }
  > = {
    headgear: {
      title: "Premium Headgear",
      description: "Beanies, Headbands, and Short Caps",
      gradient: "from-white/10 to-white/5",
    },
    smokn: {
      title: "Smokn Accessories",
      description: "Luxury lighters and premium smokn essentials",
      gradient: "from-white/10 to-white/5",
    },
    socks: {
      title: "Designer Socks",
      description: "Premium comfort for everyday wear",
      gradient: "from-white/10 to-white/5",
    },
    belts: {
      title: "Premium Belts",
      description: "Leather and chain link belts for every style",
      gradient: "from-white/10 to-white/5",
    },
    accessories: {
      title: "Premium Accessories",
      description: "Pocket Watches, Wallets, and Hankies",
      gradient: "from-white/10 to-white/5",
    },
    riding: {
      title: "Riding Gear",
      description: "Premium gear for the urban rider",
      gradient: "from-white/10 to-white/5",
    },
    mufflers: {
      title: "Winter Mufflers",
      description: "Luxury cashmere and wool accessories",
      gradient: "from-white/10 to-white/5",
    },
  };

  const info = categoryInfo[category || ""] || {
    title: "Products",
    description: "Explore our collection",
    gradient: "from-white/20 to-white/10",
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <button
              onClick={() => navigate("/")}
              className="text-white/80 hover:text-white"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Category Header - Hide when subcategory is selected */}
      {selectedSubcategory === null && (
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-b ${info.gradient} to-black`}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(200, 200, 200, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 120, 120, 0.08) 0%, transparent 50%)",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {info.title}
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {info.description}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Subcategories Section - Show only if category has subcategories */}
      {subcategories.length > 0 && selectedSubcategory === null && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-t border-b border-white/10">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <h3 className="text-2xl font-bold text-center mb-4 text-white">Browse by Type</h3>
              <p className="text-white/50 mb-12 text-center">Explore specific styles within this category</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {subcategories.map((subcat) => {
                const subcatProduct = allProducts.find(
                  (p) => p.category === category && p.subcategory === subcat
                );
                const subcatCount = allProducts.filter(
                  (p) => p.category === category && p.subcategory === subcat
                ).length;

                return (
                  <motion.button
                    key={subcat}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSubcategory(subcat)}
                    className="group relative overflow-hidden rounded-2xl bg-black border border-white/15 hover:border-white/40 transition-all duration-300 h-64 hover:shadow-lg hover:shadow-white/10"
                  >
                    {/* Image Background */}
                    {subcatProduct && (
                      <img
                        src={subcatProduct.image}
                        alt={subcat}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 group-hover:via-black/50 group-hover:to-black/85 transition-all duration-300" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">
                        {subcat}
                      </h4>
                      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-white/60 group-hover:bg-white transition-colors" />
                        {subcatCount} {subcatCount === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            </div>
          </div>
        </section>
      )}

      {/* Back Button for Subcategory Selection */}
      {subcategories.length > 0 && selectedSubcategory !== null && (
        <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedSubcategory(null)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to {info.title.split(" ")[1]}
            </motion.button>
          </div>
        </section>
      )}

      {/* Products Grid - Show when no subcategories OR when subcategory is selected */}
      {(subcategories.length === 0 || selectedSubcategory !== null) && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}