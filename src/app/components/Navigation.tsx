import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [accessoriesOpen, setAccessoriesOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
            : "bg-black/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl tracking-wider"
              >
                DRIPTOWN
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="text-white/80 hover:text-white relative group transition-colors"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>

              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button className="text-white/80 hover:text-white relative group transition-colors flex items-center gap-1">
                  Shop
                  <ChevronDown className="w-4 h-4" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </button>

                <AnimatePresence>
                  {shopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-4 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl"
                    >
                      <div className="p-2">
                        <button
                          onClick={() => handleNavClick("/category/headwear")}
                          className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        >
                          Headwear
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/smoking")}
                          className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        >
                          Smoking
                        </button>
                        
                        {/* Accessories with Sub-menu */}
                        <div>
                          <button
                            onClick={() => handleNavClick("/accessories")}
                            className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                          >
                            Accessories
                          </button>
                          <div className="pl-4 mt-1 space-y-1">
                            <button
                              onClick={() => handleNavClick("/category/socks")}
                              className="w-full text-left px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                            >
                              Socks
                            </button>
                            <button
                              onClick={() => handleNavClick("/category/stockings")}
                              className="w-full text-left px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                            >
                              Stockings
                            </button>
                            <button
                              onClick={() => handleNavClick("/category/riding")}
                              className="w-full text-left px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                            >
                              Riding Gear
                            </button>
                            <button
                              onClick={() => handleNavClick("/category/mufflers")}
                              className="w-full text-left px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                            >
                              Mufflers
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/about"
                className="text-white/80 hover:text-white relative group transition-colors"
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>

              <Link
                to="/contact"
                className="text-white/80 hover:text-white relative group transition-colors"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            </div>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/cart")}
                className="relative p-2 text-white/80 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getCartCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black rounded-full text-xs flex items-center justify-center"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-2 p-8 pt-28 overflow-y-auto">
              <button
                onClick={() => handleNavClick("/")}
                className="text-left text-xl text-white/80 hover:text-white transition-colors py-3"
              >
                Home
              </button>

              <div>
                <button
                  onClick={() => setAccessoriesOpen(!accessoriesOpen)}
                  className="w-full text-left text-xl text-white/80 hover:text-white transition-colors py-3 flex items-center justify-between"
                >
                  Shop
                  <ChevronDown className={`w-5 h-5 transition-transform ${accessoriesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {accessoriesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 space-y-2 overflow-hidden"
                    >
                      <button
                        onClick={() => handleNavClick("/category/headwear")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Headwear
                      </button>
                      <button
                        onClick={() => handleNavClick("/category/smoking")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Smoking
                      </button>
                      <button
                        onClick={() => handleNavClick("/accessories")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Accessories
                      </button>
                      <div className="pl-4 space-y-2">
                        <button
                          onClick={() => handleNavClick("/category/socks")}
                          className="w-full text-left text-sm text-white/50 hover:text-white transition-colors py-2"
                        >
                          Socks
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/stockings")}
                          className="w-full text-left text-sm text-white/50 hover:text-white transition-colors py-2"
                        >
                          Stockings
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/riding")}
                          className="w-full text-left text-sm text-white/50 hover:text-white transition-colors py-2"
                        >
                          Riding Gear
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/mufflers")}
                          className="w-full text-left text-sm text-white/50 hover:text-white transition-colors py-2"
                        >
                          Mufflers
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => handleNavClick("/about")}
                className="text-left text-xl text-white/80 hover:text-white transition-colors py-3"
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick("/contact")}
                className="text-left text-xl text-white/80 hover:text-white transition-colors py-3"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
