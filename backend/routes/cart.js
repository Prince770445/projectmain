const express = require('express');
const requireAuth = require('../middleware/auth');
const Product = require('../models/Product');
const { body } = require('express-validator');

const router = express.Router();

// Get cart (stateless - returns empty as cart is managed client-side)
router.get('/', async (req, res) => {
  res.json({ items: [], total: 0 });
});

// Add to cart validation endpoint
router.post('/', requireAuth, [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    res.json({
      item: {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Server error adding to cart' });
  }
});

// Remove from cart validation endpoint
router.delete('/:productId', requireAuth, async (req, res) => {
  try {
    const productId = req.params.productId;
    res.json({ message: 'Item removed from cart', productId });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Server error removing from cart' });
  }
});

module.exports = router;


