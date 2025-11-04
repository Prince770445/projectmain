# 🛍️ HubShop - Progressive Web App E-Commerce Platform

A modern, offline-first Progressive Web App (PWA) e-commerce platform built with React and Node.js. Shop anytime, anywhere - even without an internet connection!

![HubShop Banner](https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=300&fit=crop)

## ✨ Features

### 🌟 Core Features
- **Progressive Web App (PWA)** - Install on any device and use like a native app
- **Offline Support** - Browse products and add to cart without internet
- **Background Sync** - Cart syncs automatically when connection returns
- **Service Worker** - Smart caching for instant loading
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 🛒 E-Commerce Features
- Browse 31+ products across 4 categories
- Product search and filtering
- Shopping cart management
- User authentication (Login/Register)
- Order placement and tracking
- Secure checkout process

### 🎨 Modern UI/UX
- Beautiful purple gradient design theme
- Custom Montserrat and Poppins fonts
- Smooth animations and transitions
- Glass-morphism effects
- Mobile-first responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Docker)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/hubshop.git
cd hubshop
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Set up MongoDB**

Using Docker (Recommended):
```bash
docker compose up -d
```

Or use a local MongoDB installation on port 27017.

4. **Seed the database**
```bash
cd backend
node scripts/seed.js
```

5. **Start the application**

Option 1 - Both servers at once (Windows):
```bash
# From project root
start-all.bat
```

Option 2 - Separate terminals:
```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
cd frontend
npm start
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 👤 Demo Account

```
Email: demo@example.com
Password: password123
```

## 📁 Project Structure

```
hubshop/
├── backend/                 # Express.js backend
│   ├── middleware/         # Authentication middleware
│   ├── models/             # MongoDB schemas
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── categories.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── scripts/            # Database seeding
│   │   └── seed.js
│   └── server.js           # Express server entry point
│
├── frontend/               # React PWA frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json   # PWA manifest
│   │   └── service-worker.js
│   └── src/
│       ├── components/     # React components
│       │   ├── Navbar.js
│       │   └── OfflineBanner.js
│       ├── context/        # React Context API
│       │   ├── AuthContext.js
│       │   └── CartContext.js
│       ├── pages/          # Page components
│       │   ├── Home.js
│       │   ├── Products.js
│       │   ├── ProductDetail.js
│       │   ├── Cart.js
│       │   ├── Orders.js
│       │   ├── Login.js
│       │   └── Register.js
│       ├── services/       # API services
│       │   └── api.js
│       ├── utils/          # Utilities
│       │   └── indexedDB.js
│       ├── App.js
│       ├── App.css
│       └── index.js
│
└── docker-compose.yml      # MongoDB Docker setup
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Context API** - State management
- **Axios** - HTTP client
- **Service Workers** - Offline functionality
- **IndexedDB** - Local storage
- **PWA** - Progressive Web App features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container setup

## 🎨 Design Features

- **Custom Fonts**: Montserrat (headings) and Poppins (body)
- **Color Scheme**: Purple gradient (#667eea to #764ba2)
- **Glass-morphism**: Modern frosted glass effects
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Grid**: CSS Grid and Flexbox layouts

## 📱 PWA Features

### Offline Capabilities
- Browse products offline
- View product details offline
- Add items to cart offline
- Cart syncs when online

### Installation
- Install on desktop (Chrome, Edge)
- Add to home screen on mobile
- Works like a native app
- App icon and splash screen

### Performance
- Service worker caching
- Lazy loading images
- Code splitting
- Optimized bundle size

## 🔐 API Endpoints

### Authentication
```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login user
```

### Products
```
GET  /api/products       - Get all products (with filters)
GET  /api/products/:id   - Get single product
```

### Categories
```
GET  /api/categories     - Get all categories
```

### Cart (Protected)
```
GET  /api/cart           - Get user's cart
POST /api/cart           - Add item to cart
PUT  /api/cart/:id       - Update cart item
DELETE /api/cart/:id     - Remove item from cart
```

### Orders (Protected)
```
GET  /api/orders         - Get user's orders
POST /api/orders         - Place new order
```

## 💰 Products & Categories

### Categories
1. **Electronics** (8 products)
2. **Clothing** (8 products)
3. **Home & Garden** (7 products)
4. **Sports** (8 products)

### Price Range
- ₹2,099 - ₹1,09,999 (Indian Rupees)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hubshop
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## 📊 Database Schema

### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: ObjectId (ref: Category),
  stock: Number,
  featured: Boolean
}
```

### Category
```javascript
{
  name: String,
  slug: String,
  image: String
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: String,
  createdAt: Date
}
```

## 🧪 Testing the PWA

1. Open http://localhost:3000
2. Open Chrome DevTools (F12)
3. Go to "Application" tab
4. Check Service Worker status
5. Test offline mode:
   - Go to "Network" tab
   - Select "Offline"
   - Browse the app (should work!)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Deploy with your preferred platform
```

### Database (MongoDB Atlas)
- Update MONGODB_URI in .env
- Use MongoDB Atlas connection string

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons and fonts from Google Fonts
- Inspiration from modern e-commerce platforms

## 📞 Support

For support, email your@email.com or create an issue in the repository.

---

**Made with ❤️ using React and Node.js**

⭐ Star this repo if you find it helpful!
