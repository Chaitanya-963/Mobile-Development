import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const arr = prevItems || [];
      const existing = arr.find((p) => p.id === item.id);

      if (existing) {
        return arr.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [...arr, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => {
      const arr = prevItems || [];
      return arr
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const safeItems = items || [];
  const totalItems = safeItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartTotal = safeItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items: safeItems,
        totalItems,
        cartTotal,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      items: [],
      totalItems: 0,
      cartTotal: 0,
      addToCart: () => {},
      removeFromCart: () => {},
    };
  }
  return context;
};
