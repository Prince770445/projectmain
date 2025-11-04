import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();
  const debounceRef = useRef(null);
  const isInitialMount = useRef(true);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get('/api/categories');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (search) params.search = search;

      const response = await api.get('/api/products', { params });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [selectedCategory, search]);

  useEffect(() => {
    fetchCategories();
    fetchProducts().finally(() => {
      setLoading(false);
    });
  }, [fetchCategories, fetchProducts]);

  useEffect(() => {
    // Skip fetch on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Debounce search to avoid too many API calls
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    setSearching(true);
    debounceRef.current = setTimeout(() => {
      fetchProducts().finally(() => setSearching(false));
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [fetchProducts]);

  const handleAddToCart = async (product) => {
    await addToCart(product, 1);
    alert('Product added to cart!');
  };

  return (
    <div className="container">
      <h1>Products</h1>

      {loading && (
        <div className="loading">Loading products...</div>
      )}

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '200px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%' }}
          />
          {searching && (
            <span style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              fontSize: '12px',
              color: '#666'
            }}>Searching...</span>
          )}
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ minWidth: '150px' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

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
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to={`/products/${product._id}`} style={{ flex: 1 }}>
                  <button className="btn btn-secondary">View</button>
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                  style={{ flex: 1 }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          No products found
        </div>
      )}
    </div>
  );
};

export default Products;

