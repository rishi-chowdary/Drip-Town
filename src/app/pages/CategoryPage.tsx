import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../data/products";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const products = getProductsByCategory(category || "");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [category]);

  const categoryInfo: Record<
    string,
    { title: string; description: string; gradient: string }
  > = {
    headwear: {
      title: "Premium Headwear",
      description: "Crown your style with luxury caps",
      gradient: "from-white/10 to-white/5",
    },
    smoking: {
      title: "Smoking Accessories",
      description: "Luxury lighters and premium smoking essentials",
      gradient: "from-white/10 to-white/5",
    },
    socks: {
      title: "Designer Socks",
      description: "Premium comfort for everyday wear",
      gradient: "from-white/10 to-white/5",
    },
    stockings: {
      title: "Fashion Stockings",
      description: "Luxury hosiery with timeless elegance",
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

      {/* Category Header */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${info.gradient} to-black`}
        />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(200, 200, 200, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 120, 120, 0.15) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
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
            <div className="mt-6 inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <span className="text-white/60">Showing</span>
              <span className="font-semibold text-white">
                {products.length} Products
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}