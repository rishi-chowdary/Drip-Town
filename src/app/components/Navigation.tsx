import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart, Menu, X, ChevronDown, User, LogOut, Heart, Package, Gift, HelpCircle, MapPin, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
                className="text-2xl tracking-wider roger-dropline font-bold"
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
                          onClick={() => handleNavClick("/category/headgear")}
                          className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        >
                          Headgear
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/smokn")}
                          className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        >
                          Smokn
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/riding")}
                          className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        >
                          Riding Gear
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/belts")}
                          className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        >
                          Belts
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/socks")}
                          className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        >
                          Socks
                        </button>
                        <button
                          onClick={() => handleNavClick("/category/accessories")}
                          className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        >
                          Accessories
                        </button>
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

            {/* Cart, Profile & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Profile/Login */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative p-2 text-white/80 hover:text-white transition-colors"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-white/10 text-white text-sm">
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-white/10">
                    <DropdownMenuLabel className="text-white/80">
                      {user.displayName || user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/orders")}
                      className="text-white/80 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Track Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/wishlist")}
                      className="text-white/80 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/coupons")}
                      className="text-white/80 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Coupons
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/help")}
                      className="text-white/80 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help Centre
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/addresses")}
                      className="text-white/80 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Saved Addresses
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/profile/cards")}
                      className="text-white/80 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Saved Cards
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth")}
                  className="px-4 py-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                >
                  Login
                </motion.button>
              )}

              {/* Cart */}
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

              {/* Shop Menu for mobile */}
              <div>
                <button
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  className="w-full text-left text-xl text-white/80 hover:text-white transition-colors py-3 flex items-center justify-between"
                >
                  Shop
                  <ChevronDown className={`w-5 h-5 transition-transform ${shopDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {shopDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 space-y-2 overflow-hidden"
                    >
                      <button
                        onClick={() => handleNavClick("/category/headgear")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Headgear
                      </button>
                      <button
                        onClick={() => handleNavClick("/category/smokn")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Smokn
                      </button>
                      <button
                        onClick={() => handleNavClick("/category/riding")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Riding Gear
                      </button>
                      <button
                        onClick={() => handleNavClick("/category/belts")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Belts
                      </button>
                      <button
                        onClick={() => handleNavClick("/category/socks")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Socks
                      </button>
                      <button
                        onClick={() => handleNavClick("/category/accessories")}
                        className="w-full text-left text-white/60 hover:text-white transition-colors py-2"
                      >
                        Accessories
                      </button>
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

              {/* Profile Options for Mobile */}
              {user && (
                <>
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="text-white/60 text-sm mb-2">Account</div>
                    <button
                      onClick={() => handleNavClick("/profile/orders")}
                      className="w-full text-left text-white/80 hover:text-white transition-colors py-2 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      Track Orders
                    </button>
                    <button
                      onClick={() => handleNavClick("/profile/wishlist")}
                      className="w-full text-left text-white/80 hover:text-white transition-colors py-2 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      Wishlist
                    </button>
                    <button
                      onClick={() => handleNavClick("/profile/coupons")}
                      className="w-full text-left text-white/80 hover:text-white transition-colors py-2 flex items-center gap-2"
                    >
                      <Gift className="w-4 h-4" />
                      Coupons
                    </button>
                    <button
                      onClick={() => handleNavClick("/help")}
                      className="w-full text-left text-white/80 hover:text-white transition-colors py-2 flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Help Centre
                    </button>
                    <button
                      onClick={() => handleNavClick("/profile/addresses")}
                      className="w-full text-left text-white/80 hover:text-white transition-colors py-2 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Saved Addresses
                    </button>
                    <button
                      onClick={() => handleNavClick("/profile/cards")}
                      className="w-full text-left text-white/80 hover:text-white transition-colors py-2 flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Saved Cards
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-400 hover:text-red-300 transition-colors py-2 flex items-center gap-2 mt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}

              {!user && (
                <button
                  onClick={() => handleNavClick("/auth")}
                  className="w-full text-left text-xl text-white/80 hover:text-white transition-colors py-3 border-t border-white/10 pt-4 mt-4"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
