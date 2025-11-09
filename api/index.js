const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',')
  : ['*'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes('*') || !origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - Vercel already handles /api prefix in routing
app.use('/auth', require('../backend/routes/auth'));
app.use('/products', require('../backend/routes/products'));
app.use('/categories', require('../backend/routes/categories'));
app.use('/cart', require('../backend/routes/cart'));
app.use('/orders', require('../backend/routes/orders'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// MongoDB connection (singleton pattern for serverless)
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pwa-shop';
    const client = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    cachedDb = client;
    console.log('✓ MongoDB connected');
    return cachedDb;
  } catch (error) {
    console.error('⚠ MongoDB connection error:', error.message);
    throw error;
  }
}

// Connect to database before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Export as serverless function
module.exports = app;

