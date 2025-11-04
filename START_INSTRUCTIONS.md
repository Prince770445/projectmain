# 🚀 How to Start Your PWA Shop

## Quick Start Commands

### Option 1: Start Everything at Once (Recommended)
```bash
npm run dev
```
This will start both backend and frontend together.

### Option 2: Start Separately (2 Terminal Windows)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 🌐 Access Your Application

Once started:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📝 Login Credentials

Use these demo credentials to test:
- **Email**: demo@example.com
- **Password**: password123

Or register a new account!

## 🧪 Test PWA Features

1. **Open the app**: http://localhost:3000
2. **Install as PWA**: Look for install prompt in browser
3. **Test offline**:
   - Press F12 (DevTools)
   - Go to Network tab
   - Select "Offline"
   - Try browsing and adding to cart!

## ✅ What's Running?

Based on your current setup:

### ✅ Backend Status
- Server: http://localhost:5000 ✓
- MongoDB: Connected ✓
- Database: Seeded with sample data ✓
- API: Ready to accept requests ✓

### 🔄 Frontend Status
- Starting on http://localhost:3000
- React Dev Server with hot reload
- Service Worker for offline support
- Proxy configured to backend

## 🛠️ Troubleshooting

### Port Already in Use
If you see "EADDRINUSE" error:
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it (replace <PID> with actual number)
taskkill /PID <PID> /F
```

### MongoDB Not Connected
Start MongoDB:
```bash
# Using Docker
docker compose up -d

# Or if using local MongoDB, make sure it's running
```

### Frontend Won't Start
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📊 Sample Data Available

Your database is pre-populated with:
- 4 Categories (Electronics, Clothing, Home & Garden, Sports)
- 13 Products (smartphone, headphones, laptop, t-shirt, etc.)
- 1 Demo user account

## 🎉 Ready to Go!

Open http://localhost:3000 in your browser and start shopping!

---

**Need Help?** Check the other documentation files:
- `STATUS.md` - Full status and features
- `QUICK_START.md` - Quick reference guide  
- `README.md` - Complete project documentation










