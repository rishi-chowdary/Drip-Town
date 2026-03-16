import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, getProductsByCategory } from "../data/products";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [smokeRevealed, setSmokeRevealed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      heroRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Start the smoke reveal animation after a short delay
    const timer = setTimeout(() => {
      setSmokeRevealed(true);
    }, 2000); // 2 second delay before starting reveal

    return () => clearTimeout(timer);
  }, []);

  const featuredProducts = products.slice(0, 8);
  const headwear = getProductsByCategory("headwear");
  const smoking = getProductsByCategory("smoking");
  const socks = getProductsByCategory("socks");

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-black" />
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
              "radial-gradient(circle at 20% 50%, rgba(200,200,200,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120,120,120,0.15) 0%, transparent 50%)",
              backgroundSize: "200% 200%",
            }}
          />
        </div>

        {/* Dense White Smoke Overlay */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 1 }}
          animate={{ opacity: smokeRevealed ? 0 : 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          style={{
            background: `radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.6) 80%, rgba(255,255,255,0.4) 100%)`,
          }}
        />

        {/* Additional Smoke Particles for Depth */}
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={`smoke-${i}`}
            className="absolute blur-3xl"
            style={{
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`,
              background: `radial-gradient(circle, rgba(255,255,255,${0.8 + Math.random() * 0.2}) 0%, rgba(255,255,255,${0.6 + Math.random() * 0.2}) 50%, transparent 100%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{
              opacity: smokeRevealed ? 0 : 0.9,
              scale: smokeRevealed ? 0.5 : 1,
              y: smokeRevealed ? -50 : 0,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Brand Name - Always Visible */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 relative z-40"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #9e9e9e 50%, #1a1a1a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 50px rgba(255,255,255,0.8)",
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              DRIPTOWN
            </motion.h1>

            {/* Rest of content - Revealed after smoke */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: smokeRevealed ? 1 : 0 }}
              transition={{ duration: 3, delay: 2 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-12 max-w-3xl mx-auto"
              >
                Streetwear Accessories That Define Your Drip
              </motion.p>

              {/* Floating Products */}
              <div
                ref={heroRef}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12 transition-transform duration-200 ease-out"
              >
                {[
                  products.find((p) => p.category === "headwear"),
                  products.find((p) => p.category === "smoking"),
                  products.find((p) => p.category === "socks"),
                  products.find((p) => p.category === "stockings"),
                  products.find((p) => p.category === "riding"),
                  products.find((p) => p.category === "mufflers"),
                ]
                  .filter(Boolean)
                  .map((product, i) => (
                    <motion.div
                      key={product!.id}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        delay: i * 0.1,
                        rotate: {
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.2,
                        },
                      }}
                      className="aspect-square rounded-2xl overflow-hidden border-2 border-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
                    >
                      <ImageWithFallback
                        src={product!.image}
                        alt={product!.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-white to-white/80 rounded-full text-black font-semibold text-lg flex items-center gap-2 hover:shadow-2xl hover:shadow-white/50 transition-all"
                >
                  Shop Collection
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  Explore Drip
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <motion.section
        id="products"
        className="py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: smokeRevealed ? 1 : 0 }}
        transition={{ duration: 3, delay: 4 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Featured Collection
            </h2>
            <p className="text-white/60 text-lg">
              Discover our most popular streetwear pieces
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Caps Section */}
      <motion.section
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-soft)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: smokeRevealed ? 1 : 0 }}
        transition={{ duration: 3, delay: 5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Caps
            </h2>
            <p className="text-white/60 text-lg">
              Crown your style with luxury headwear
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {headwear.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Smoking Accessories Section */}
      <motion.section
        className="py-24 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: smokeRevealed ? 1 : 0 }}
        transition={{ duration: 3, delay: 6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">
              Premium Smoking
            </h2>
            <p className="text-white/60 text-lg">
              Luxury lighters and smoking accessories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smoking.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Socks Section */}
      <motion.section
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--bg-soft)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: smokeRevealed ? 1 : 0 }}
        transition={{ duration: 3, delay: 7 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">
              Essential Socks
            </h2>
            <p className="text-white/60 text-lg">
              Comfort meets style, one step at a time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socks.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}