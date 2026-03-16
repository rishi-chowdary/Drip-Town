import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  applyCoupon: (code: string) => { success: boolean; discount: number; message: string };
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_COUPONS = {
  "DRIP10": { discount: 10, description: "10% off your order" },
  "DRIP20": { discount: 20, description: "20% off your order" },
  "WELCOME25": { discount: 25, description: "25% off for new customers" },
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);

  const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === existingItem.id &&
          item.selectedColor === existingItem.selectedColor &&
          item.selectedSize === existingItem.selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = (code: string): { success: boolean; discount: number; message: string } => {
    const coupon = VALID_COUPONS[code.toUpperCase() as keyof typeof VALID_COUPONS];
    
    if (coupon) {
      setDiscount(coupon.discount);
      return {
        success: true,
        discount: coupon.discount,
        message: `Coupon applied! ${coupon.description}`,
      };
    }
    
    return {
      success: false,
      discount: 0,
      message: "Invalid coupon code",
    };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        applyCoupon,
        discount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
