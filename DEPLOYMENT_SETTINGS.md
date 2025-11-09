# 🚀 Deployment Settings Guide

## Build and Output Settings (Vercel/Netlify)

### For Frontend Deployment:

#### **Build Command:**
```
cd frontend && npm run build
```
or
```
npm run build
```
(if root directory is set to `frontend/`)

#### **Output Directory:**
```
frontend/build
```
or
```
build
```
(if root directory is set to `frontend/`)

#### **Install Command:**
```
npm install
```
or
```
cd frontend && npm install
```

#### **Root Directory (if deploying frontend only):**
```
frontend
```

---

## 📋 Quick Start Commands

### Start Application Locally:

#### Option 1: Using Batch File (Windows)
```powershell
cd C:\Users\CL354\OneDrive\Desktop\prince_project
.\start-all.bat
```

#### Option 2: Manual Start

**Backend:**
```powershell
cd C:\Users\CL354\OneDrive\Desktop\prince_project\backend
node server.js
```

**Frontend (PowerShell-safe):**
```powershell
cd C:\Users\CL354\OneDrive\Desktop\prince_project\frontend
cmd /c "npm start"
```
or
```powershell
cd C:\Users\CL354\OneDrive\Desktop\prince_project\frontend
.\npm.cmd start
```

#### Option 3: Temporary Policy Bypass
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd C:\Users\CL354\OneDrive\Desktop\prince_project\frontend
npm start
```

### Start MongoDB (if needed):
```powershell
cd C:\Users\CL354\OneDrive\Desktop\prince_project
docker compose up -d mongodb
cd backend
node scripts/seed.js
```

---

## 🌐 Access URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## 🔧 Environment Variables

### Backend (.env file in `backend/` directory):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pwa-shop
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (for production):
- Update API base URL in `frontend/src/services/api.js` to your backend URL
- Or set environment variable: `REACT_APP_API_URL=https://your-backend-url.com`

---

## 📦 Deployment Platforms

### Vercel (Frontend)
1. **Framework Preset:** Create React App
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `build`
5. **Install Command:** `npm install`

### Netlify (Frontend)
1. **Base directory:** `frontend`
2. **Build command:** `npm run build`
3. **Publish directory:** `frontend/build`

### Railway/Render (Backend)
1. **Build Command:** `cd backend && npm install`
2. **Start Command:** `cd backend && node server.js`
3. **Environment Variables:** Add all from backend/.env

### MongoDB Atlas (Database)
- Create cluster at https://www.mongodb.com/cloud/atlas
- Update `MONGODB_URI` in backend environment variables
- Format: `mongodb+srv://username:password@cluster.mongodb.net/pwa-shop`

---

## 🎯 Demo Credentials

```
Email: demo@example.com
Password: password123
```

---

## ⚠️ Troubleshooting

### Port Already in Use
```powershell
# Find process on port 5000
netstat -ano | findstr :5000
# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Ensure Docker Desktop is running (for local MongoDB)
- Or use MongoDB Atlas cloud database
- Check connection string in `.env` file

### Build Errors
- Ensure Node.js version 14+ is installed
- Run `npm install` in both `backend/` and `frontend/` directories
- Clear `node_modules` and reinstall if needed

---

## 📝 Notes

- Frontend build creates optimized production files in `frontend/build/`
- Backend serves frontend build files in production mode
- Service Worker is included for PWA offline functionality
- CORS is configured for `http://localhost:3000` by default


