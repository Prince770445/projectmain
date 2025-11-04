import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-cart">
          <p>You haven't placed any orders yet.</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="cart-container" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                <span style={{ 
                  padding: '5px 10px', 
                  background: order.status === 'pending' ? '#ffc107' : '#28a745',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  {order.status}
                </span>
              </div>

              {order.items.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '60px', height: '60px' }}
                    onError={(e) => {
                      e.target.src = 'https://picsum.photos/400/300?random=' + (item.product || idx);
                    }}
                  />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <div>Quantity: {item.quantity}</div>
                    <div className="price">₹{item.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <h3>Total: ₹{order.total.toLocaleString('en-IN')}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

