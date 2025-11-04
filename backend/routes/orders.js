const express = require('express');
const requireAuth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { body } = require('express-validator');

const router = express.Router();

// Get user's orders
router.get('/', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 })
      .lean();

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Server error fetching orders' });
  }
});

// Get single order
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId
    })
      .populate('items.product', 'name image')
      .lean();

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error fetching order' });
  }
});

// Create order
router.post('/', requireAuth, [
  body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
  body('items.*.productId').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shippingAddress').optional().isObject()
], async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        quantity: item.quantity,
        price: product.price
      });

      // Update stock
      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      total,
      shippingAddress: shippingAddress || {},
      status: 'pending'
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error creating order' });
  }
});

module.exports = router;


