"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  category: string;
  name: string;
  price: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  // 🔥 1. Agregamos la nueva función a la interfaz
  updateQuantity: (productId: number, action: "increase" | "decrease") => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // 🔥 2. Creamos la lógica para sumar o restar
  const updateQuantity = (productId: number, action: "increase" | "decrease") => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          if (action === "increase") {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === "decrease" && item.quantity > 1) {
            // Solo restamos si la cantidad es mayor a 1 (para no tener cantidad 0)
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // 🔥 3. Exportamos la nueva función aquí abajo
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}