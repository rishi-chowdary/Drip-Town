import { motion } from "motion/react";
import { Instagram, Youtube, Twitter, Facebook, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/driptown",
      color: "hover:text-white",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/driptown",
      color: "hover:text-white",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/driptown",
      color: "hover:text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/driptown",
      color: "hover:text-white",
    },
  ];

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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight text-white">
            About DripTown
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Where premium streetwear meets minimalist luxury
          </p>
        </motion.div>

        {/* Brand Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1563504520138-06ce900dcc10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMHVyYmFuJTIwbGlmZXN0eWxlfGVufDF8fHx8MTc3MzY1NTMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="DripTown Lifestyle"
              className="w-full h-96 object-cover rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div>
              <h2 className="text-3xl mb-4 text-white">Our Story</h2>
              <p className="text-white/70 leading-relaxed">
                DripTown was born from a vision to redefine streetwear. We believe that true style doesn't need loud colors or excessive branding—it speaks through quality, craftsmanship, and timeless design.
              </p>
            </div>

            <div>
              <h2 className="text-3xl mb-4 text-white">Our Mission</h2>
              <p className="text-white/70 leading-relaxed">
                To provide premium streetwear accessories that blend minimalist aesthetics with uncompromising quality. Every piece is carefully curated to elevate your everyday style.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg p-12 mb-20 hover:border-[var(--border-soft)] transition"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1771919351694-0b0638c9c919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmxhY2slMjBjbG90aGluZyUyMGRlc2lnbnxlbnwxfHx8fDE3NzM2NTUzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Minimalist Design"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl mb-4 text-white">Our Vision</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                We envision a world where streetwear transcends trends and becomes a timeless expression of individual style. DripTown is more than a brand—it's a lifestyle choice for those who appreciate the finer details.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-white/80">Premium Quality Materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-white/80">Minimalist Design Philosophy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-white/80">Sustainable Production</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-white/80">Timeless Streetwear</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl mb-8">Connect With Us</h2>
          <p className="text-white/60 mb-10">
            Follow our journey and stay updated with the latest drops
          </p>
          
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className={`p-4 bg-white/5 border border-white/10 rounded-full text-white/80 ${social.color} transition-all duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
