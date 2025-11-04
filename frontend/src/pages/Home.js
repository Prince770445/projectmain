import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/api/products?featured=true&limit=8'),
        api.get('/api/categories')
      ]);
      setProducts(productsRes.data.products || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <section className="welcome-section">
        <h1>Welcome to HubShop</h1>
        <p>
          Your ultimate shopping hub. Discover amazing products and shop with ease, online or offline.
        </p>
      </section>

      <section>
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img 
                src={product.image} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/400/300?random=' + product._id;
                }}
              />
              <div className="product-card-content">
                <h3>{product.name}</h3>
                <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
                <p className="description">{product.description}</p>
                <Link to={`/products/${product._id}`}>
                  <button className="btn btn-primary">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Browse by Category</h2>
        <div className="product-grid">
          {categories.map((category) => (
            <Link key={category._id} to={`/products?category=${category._id}`} style={{ textDecoration: 'none' }}>
              <div className="product-card">
                {category.image && (
                  <img 
                    src={category.image} 
                    alt={category.name}
                    onError={(e) => {
                      e.target.src = 'https://picsum.photos/400/300?random=' + category._id;
                    }}
                  />
                )}
                <div className="product-card-content">
                  <h3>{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

