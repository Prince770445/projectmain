require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pwa-shop');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Seed Categories
    const electronics = await Category.create({
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop'
    });

    const clothing = await Category.create({
      name: 'Clothing',
      slug: 'clothing',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop'
    });

    const home = await Category.create({
      name: 'Home & Garden',
      slug: 'home-garden',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop'
    });

    const sports = await Category.create({
      name: 'Sports',
      slug: 'sports',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop'
    });

    console.log('Created categories');

    // Seed Products
    const products = [
      // Electronics
      {
        name: 'Smartphone Pro',
        description: 'High-end smartphone with latest features and premium build quality.',
        price: 74999,
        image: 'https://images.unsplash.com/photo-1592286927505-c0d0c746e637?w=400&h=300&fit=crop',
        category: electronics._id,
        stock: 50,
        featured: true
      },
      {
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones with noise cancellation and long battery life.',
        price: 24999,
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop',
        category: electronics._id,
        stock: 75,
        featured: true
      },
      {
        name: 'Laptop Ultra',
        description: 'Powerful laptop for professionals with high-resolution display and fast processor.',
        price: 109999,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        category: electronics._id,
        stock: 30,
        featured: false
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking and notifications.',
        price: 29999,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop',
        category: electronics._id,
        stock: 60,
        featured: false
      },
      {
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with premium sound quality and charging case.',
        price: 12499,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop',
        category: electronics._id,
        stock: 85,
        featured: true
      },
      {
        name: 'Gaming Keyboard',
        description: 'Mechanical gaming keyboard with RGB lighting and programmable keys.',
        price: 10999,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop',
        category: electronics._id,
        stock: 40,
        featured: false
      },
      {
        name: 'Portable Speaker',
        description: 'Waterproof Bluetooth speaker with 360-degree sound and 12-hour battery.',
        price: 7499,
        image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=300&fit=crop',
        category: electronics._id,
        stock: 65,
        featured: false
      },
      {
        name: '4K Webcam',
        description: 'Professional 4K webcam with auto-focus and built-in microphone.',
        price: 16999,
        image: 'https://images.unsplash.com/photo-1589739900243-c563490fea7c?w=400&h=300&fit=crop',
        category: electronics._id,
        stock: 35,
        featured: false
      },
      
      // Clothing
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable and stylish cotton t-shirt, perfect for everyday wear.',
        price: 2099,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=300&fit=crop',
        category: clothing._id,
        stock: 100,
        featured: true
      },
      {
        name: 'Denim Jacket',
        description: 'Classic denim jacket that never goes out of style.',
        price: 6699,
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=300&fit=crop',
        category: clothing._id,
        stock: 45,
        featured: false
      },
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes with excellent cushioning and support.',
        price: 9999,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
        category: clothing._id,
        stock: 80,
        featured: true
      },
      {
        name: 'Wool Sweater',
        description: 'Warm and cozy wool sweater for cold weather.',
        price: 7499,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop',
        category: clothing._id,
        stock: 35,
        featured: false
      },
      {
        name: 'Leather Jacket',
        description: 'Genuine leather jacket with premium finish and stylish design.',
        price: 20999,
        image: 'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?w=400&h=300&fit=crop',
        category: clothing._id,
        stock: 20,
        featured: true
      },
      {
        name: 'Casual Sneakers',
        description: 'Versatile casual sneakers for everyday comfort and style.',
        price: 6699,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop',
        category: clothing._id,
        stock: 90,
        featured: false
      },
      {
        name: 'Summer Dress',
        description: 'Light and breezy summer dress perfect for warm weather.',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop',
        category: clothing._id,
        stock: 55,
        featured: false
      },
      {
        name: 'Sports Hoodie',
        description: 'Comfortable sports hoodie with moisture-wicking fabric.',
        price: 5499,
        image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400&h=300&fit=crop',
        category: clothing._id,
        stock: 70,
        featured: false
      },
      
      // Home & Garden
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe and auto-shutoff.',
        price: 10999,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
        category: home._id,
        stock: 40,
        featured: true
      },
      {
        name: 'Ceramic Plant Pots',
        description: 'Set of 3 beautiful ceramic pots for your indoor plants.',
        price: 3299,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop',
        category: home._id,
        stock: 60,
        featured: false
      },
      {
        name: 'LED Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop',
        category: home._id,
        stock: 55,
        featured: false
      },
      {
        name: 'Throw Pillows Set',
        description: 'Set of 4 decorative throw pillows in modern designs.',
        price: 4199,
        image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&h=300&fit=crop',
        category: home._id,
        stock: 75,
        featured: false
      },
      {
        name: 'Wall Art Canvas',
        description: 'Beautiful abstract wall art canvas to enhance your space.',
        price: 7499,
        image: 'https://images.unsplash.com/photo-1582561833675-f54376ba9e50?w=400&h=300&fit=crop',
        category: home._id,
        stock: 30,
        featured: false
      },
      {
        name: 'Essential Oil Diffuser',
        description: 'Ultrasonic aroma diffuser with LED lights and timer.',
        price: 3799,
        image: 'https://images.unsplash.com/photo-1585232350370-2747f37f9d58?w=400&h=300&fit=crop',
        category: home._id,
        stock: 80,
        featured: true
      },
      {
        name: 'Garden Tool Set',
        description: 'Complete 10-piece garden tool set with carrying bag.',
        price: 6699,
        image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=400&h=300&fit=crop',
        category: home._id,
        stock: 45,
        featured: false
      },
      
      // Sports
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with carrying strap and extra cushioning.',
        price: 4199,
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=300&fit=crop',
        category: sports._id,
        stock: 70,
        featured: true
      },
      {
        name: 'Dumbbell Set',
        description: 'Adjustable dumbbell set for home workouts.',
        price: 16699,
        image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&h=300&fit=crop',
        category: sports._id,
        stock: 25,
        featured: false
      },
      {
        name: 'Basketball',
        description: 'Premium basketball with excellent grip and durability.',
        price: 2899,
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=300&fit=crop',
        category: sports._id,
        stock: 90,
        featured: false
      },
      {
        name: 'Resistance Bands',
        description: 'Set of 5 resistance bands for strength training and flexibility.',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop',
        category: sports._id,
        stock: 100,
        featured: false
      },
      {
        name: 'Cycling Helmet',
        description: 'Lightweight cycling helmet with ventilation and adjustable fit.',
        price: 5799,
        image: 'https://images.unsplash.com/photo-1556316384-12c35d30afa4?w=400&h=300&fit=crop',
        category: sports._id,
        stock: 50,
        featured: false
      },
      {
        name: 'Sports Water Bottle',
        description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours.',
        price: 2099,
        image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop',
        category: sports._id,
        stock: 120,
        featured: false
      },
      {
        name: 'Tennis Racket',
        description: 'Professional-grade tennis racket with carbon fiber frame.',
        price: 13299,
        image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop',
        category: sports._id,
        stock: 35,
        featured: true
      },
      {
        name: 'Fitness Tracker',
        description: 'Advanced fitness tracker with heart rate monitor and sleep tracking.',
        price: 8299,
        image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=400&h=300&fit=crop',
        category: sports._id,
        stock: 60,
        featured: false
      }
    ];

    await Product.insertMany(products);
    console.log('Created products');

    // Create demo user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const demoUser = await User.create({
      username: 'demo',
      email: 'demo@example.com',
      password: hashedPassword
    });
    console.log('Created demo user');

    console.log('\nSeed data successfully added!');
    console.log('\nDemo credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

