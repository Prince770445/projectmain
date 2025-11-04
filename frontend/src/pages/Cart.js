import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const items = cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));

      await api.post('/api/orders', {
        items,
        shippingAddress: {}
      });

      alert('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      alert('Error placing order: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        {cart.map((item) => (
          <div key={item.productId} className="cart-item">
            <img 
              src={item.image} 
              alt={item.name}
              onError={(e) => {
                e.target.src = 'https://picsum.photos/400/300?random=' + item.productId;
              }}
            />
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <div className="price">₹{item.price.toLocaleString('en-IN')}</div>
            </div>
            <div className="cart-item-controls">
              <button
                className="btn btn-secondary"
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-secondary"
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => removeFromCart(item.productId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <h3>Total: ₹{getTotal().toLocaleString('en-IN')}</h3>
          <button onClick={handleCheckout} className="btn btn-primary">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

