import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CartItem, Shoe } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (shoe: Shoe, size: number) => void;
  removeFromCart: (shoeId: string) => void;
  updateQuantity: (shoeId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((shoe: Shoe, size: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.shoe._id === shoe._id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.shoe._id === shoe._id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { shoe, quantity: 1, size }];
    });
  }, []);

  const removeFromCart = useCallback((shoeId: string) => {
    setItems((prev) => prev.filter((i) => i.shoe._id !== shoeId));
  }, []);

  const updateQuantity = useCallback((shoeId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.shoe._id !== shoeId));
      return;
    }
    setItems((prev) => prev.map((i) => (i.shoe._id === shoeId ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.shoe.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
