import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartStorage } from '../utils/indexedDB';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await cartStorage.getCart();
      setCart(savedCart || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const newCart = [...cart];
      const existingItem = newCart.find(item => item.productId === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        newCart.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        });
      }

      // Update state immediately for responsive UI
      setCart(newCart);
      // Save to storage in background
      await cartStorage.saveCart(newCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const newCart = cart.filter(item => item.productId !== productId);
      setCart(newCart);
      await cartStorage.saveCart(newCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const newCart = cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );

      setCart(newCart);
      await cartStorage.saveCart(newCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      setCart([]);
      await cartStorage.saveCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

