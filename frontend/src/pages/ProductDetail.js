import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = async () => {
    for (let i = 0; i < quantity; i++) {
      await addToCart(product, 1);
    }
    alert(`${quantity} item(s) added to cart!`);
    navigate('/cart');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        ← Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
            onError={(e) => {
              e.target.src = 'https://picsum.photos/400/300?random=' + product._id;
            }}
          />
        </div>

        <div>
          <h1>{product.name}</h1>
          <div className="price" style={{ fontSize: '32px', margin: '15px 0' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <p style={{ marginBottom: '20px' }}>{product.description}</p>

          {product.stock > 0 ? (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  style={{ maxWidth: '100px' }}
                />
                <span style={{ marginLeft: '10px', color: '#666' }}>
                  ({product.stock} in stock)
                </span>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ width: '100%', padding: '15px' }}
              >
                Add to Cart
              </button>
            </>
          ) : (
            <div style={{ padding: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

