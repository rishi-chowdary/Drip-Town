import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, getProductsByCategory } from "../data/products";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const scrollVelocitySpring = useSpring(scrollVelocity, {
    damping: 20,
    stiffness: 130,
  });

  const scrollSmokeY = useTransform(scrollYProgress, [0, 0.5], [-420, 0]);
  const scrollSmokeYReverse = useTransform(scrollYProgress, [0, 0.5], [420, 0]);
  const scrollSmokeX = useTransform(scrollYProgress, [0, 0.5], [-380, 0]);
  const scrollSmokeXReverse = useTransform(scrollYProgress, [0, 0.5], [380, 0]);
  const scrollSmokeOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0, 0.85, 0.7, 0.25]);

  const scrollVelocityOffset = useTransform(scrollVelocitySpring, [-1, 0, 1], [-20, 0, 20]);
  const topSmokeY = useTransform([scrollSmokeY, scrollVelocityOffset], ([y, v]) => y + v);
  const bottomSmokeY = useTransform([scrollSmokeYReverse, scrollVelocityOffset], ([y, v]) => y - v);
  const leftSmokeX = useTransform([scrollSmokeX, scrollVelocityOffset], ([x, v]) => x + v);
  const rightSmokeX = useTransform([scrollSmokeXReverse, scrollVelocityOffset], ([x, v]) => x - v);

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || isMobile) return;
      
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 15;
        const y = (clientY / window.innerHeight - 0.5) * 15;
        heroRef.current!.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    // Scroll to top when page mounts
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const featuredProducts = products.slice(0, 8);
  const headwear = getProductsByCategory("headwear");
  const smoking = getProductsByCategory("smoking");
  const socks = getProductsByCategory("socks");

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-x-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10"
          style={{ filter: 'brightness(0.4) contrast(0.8)' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Scroll-driven smoke from edges */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-56 pointer-events-none"
          style={{
            zIndex: 25,
            y: topSmokeY,
            opacity: scrollSmokeOpacity,
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(90px)",
          }}
        />
        <motion.div
          className="absolute left-0 right-0 bottom-0 h-56 pointer-events-none"
          style={{
            zIndex: 25,
            y: bottomSmokeY,
            opacity: scrollSmokeOpacity,
            background:
              "radial-gradient(circle at 50% 100%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(90px)",
          }}
        />
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-56 pointer-events-none"
          style={{
            zIndex: 25,
            x: leftSmokeX,
            opacity: scrollSmokeOpacity,
            background:
              "radial-gradient(circle at 0% 50%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(90px)",
          }}
        />
        <motion.div
          className="absolute top-0 bottom-0 right-0 w-56 pointer-events-none"
          style={{
            zIndex: 25,
            x: rightSmokeX,
            opacity: scrollSmokeOpacity,
            background:
              "radial-gradient(circle at 100% 50%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Brand Name - Always Visible */}
            <motion.h1
              className="text-[clamp(3rem,12vw,10rem)] mb-6 relative z-40 roger-dropline font-bold title-gradient whitespace-nowrap"
              animate={{
                opacity: [0.95, 1, 0.95],
                scale: [1, 1.02, 1],
                textShadow: [
                  "0 10px 30px rgba(255, 255, 255, 0.5), 0 0 50px rgba(200, 200, 200, 0.4)",
                  "0 15px 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(200, 200, 200, 0.5)",
                  "0 10px 30px rgba(255, 255, 255, 0.5), 0 0 50px rgba(200, 200, 200, 0.4)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
              initial={{ opacity: 0.95, scale: 1 }}
            >
              DRIPTOWN
            </motion.h1>

            {/* Rest of content - Always visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto"
              >
                Streetwear Accessories That Define Your Drip
              </motion.p>

              {/* Floating Products */}
              <div
                ref={heroRef}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12 transition-transform duration-200 ease-out"
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
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
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
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
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
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
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
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
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