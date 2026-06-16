"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Bike, ColorVariant } from "@/data/bikes";

export type CartItem = {
  bike: Bike;
  selectedColor: ColorVariant;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (bike: Bike, color: ColorVariant) => void;
  removeItem: (bikeId: string, colorName: string) => void;
  updateQuantity: (bikeId: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((bike: Bike, selectedColor: ColorVariant) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.bike.id === bike.id && i.selectedColor.name === selectedColor.name
      );
      if (existing) {
        return prev.map((i) =>
          i.bike.id === bike.id && i.selectedColor.name === selectedColor.name
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { bike, selectedColor, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((bikeId: string, colorName: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.bike.id === bikeId && i.selectedColor.name === colorName))
    );
  }, []);

  const updateQuantity = useCallback(
    (bikeId: string, colorName: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(bikeId, colorName);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.bike.id === bikeId && i.selectedColor.name === colorName
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.bike.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
