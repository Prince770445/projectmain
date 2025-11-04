# Quick Start Guide

## 🚀 Your PWA Shop Application

Both servers should now be starting up. Here's what's happening:

### Application URLs
- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:5000

### ⚠️ Important: MongoDB Setup

The backend requires MongoDB to function properly. You have two options:

#### Option 1: Docker (Recommended)
```bash
docker compose up -d
```

Then restart the backend to connect to MongoDB.

#### Option 2: Local MongoDB
Install MongoDB locally and make sure it's running on port 27017.

### 📊 Seed the Database

Once MongoDB is running:

```bash
cd backend
npm run seed
```

This creates:
- Demo user: `demo@example.com` / `password123`
- Sample products and categories

### 🧪 Testing the Application

1. **Open Browser**: http://localhost:3000
2. **Register/Login**: Use the demo credentials or create a new account
3. **Browse Products**: View featured products and categories
4. **Test Offline Mode**:
   - Open Chrome DevTools (F12)
   - Go to Application tab → Service Workers
   - Enable "Offline" in Network tab
   - Try adding items to cart

### 📱 PWA Features

- **Installable**: Click browser menu → "Install PWA Shop"
- **Offline Support**: Browse products without internet
- **Offline Cart**: Add to cart works offline
- **Background Sync**: Cart syncs when connection returns

### 🛠️ Development Commands

#### Start Both Servers (from project root)
```bash
npm run dev
```

#### Start Separately
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm start
```

#### Seed Database
```bash
cd backend
npm run seed
```

### 🗂️ Project Structure

```
prince_project/
├── backend/          # Express API server
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/  # Auth middleware
│   └── server.js     # Entry point
├── frontend/         # React PWA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── public/
│       └── service-worker.js
└── docker-compose.yml
```

### 🔧 Troubleshooting

#### Port already in use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port in .env
PORT=5001
```

#### MongoDB connection error
- Make sure MongoDB is running
- Check connection string in `backend/.env`
- Try: `mongodb://127.0.0.1:27017/pwa-shop`

### 📝 Next Steps

1. Start MongoDB (if not running)
2. Seed the database with sample data
3. Open http://localhost:3000 in your browser
4. Test offline functionality
5. Run Lighthouse audit for PWA compliance

Enjoy your PWA Shop! 🎉










