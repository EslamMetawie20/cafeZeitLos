import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { type MenuItem } from '../types';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cz_cart', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cz_cart_updated'));
  }, [items]);

  const addItem = (item: MenuItem, quantity = 1) => {
    setItems(current => {
      const existing = current.find(i => i.id === item.id);
      if (existing) {
        return current.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...current, { ...item, quantity }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(current => current.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(current => current.map(i => i.id === itemId ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
