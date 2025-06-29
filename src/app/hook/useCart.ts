// src/hooks/useCart.ts (or wherever you organize your hooks)

import { useEffect, useState } from 'react';

// Lesson type
export type Lesson = {
  id: string;
  name: string;
  price: number;
};

// Cart item with quantity
export type CartItem = Lesson & {
  quantity: number;
};
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Lesson, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((exitem) => exitem.id === item.id);
      if (existing) {
        return prevCart.map((exitem) =>
          exitem.id === item.id
            ? { ...exitem, quantity: exitem.quantity + quantity }
            : exitem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price (sum of price * quantity)
  const getTotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
  };
}
