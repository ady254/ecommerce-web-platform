import { createContext, useContext, useState, ReactNode } from "react";

// Minimal Product type - extend as needed
export type Product = {
  id: string;
  [key: string]: any;
};

export type CartItem = Product & {
  size?: string;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, size?: string, qty?: number) => void;
  updateQuantity: (id: string, size: string | undefined, qty: number) => void;
  removeItem: (id: string, size?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string = "", qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + qty } : item
        );
      }

      return [...prev, { ...product, size, quantity: qty }];
    });
  };

  const updateQuantity = (id: string, size: string | undefined, qty: number) => {
    setCart((prev) => prev.map((item) => (item.id === id && item.size === size ? { ...item, quantity: qty } : item)));
  };

  const removeItem = (id: string, size?: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
