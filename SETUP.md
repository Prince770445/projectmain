# Setup Instructions

## Prerequisites

- Node.js 16 or higher
- MongoDB (running locally or via Docker)

## Setup Steps

1. **Install MongoDB** (if not already installed):
   
   Option A - Using Docker:
   ```bash
   docker compose up -d
   ```
   
   Option B - Install MongoDB locally from https://www.mongodb.com/try/download/community

2. **Configure Environment Variables**:
   
   Create a `.env` file in the `backend` directory:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pwa-shop
   JWT_SECRET=your-secret-key-here
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Install Dependencies**:
   ```bash
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies  
   cd ../frontend
   npm install
   ```

4. **Seed the Database**:
   ```bash
   cd backend
   npm run seed
   ```
   
   This will create sample data including:
   - Demo user: demo@example.com / password: password123
   - Sample products and categories

5. **Run the Application**:
   
   In one terminal (backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   In another terminal (frontend):
   ```bash
   cd frontend
   npm start
   ```

6. **Access the Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Demo Credentials

- Email: demo@example.com
- Password: password123

## Testing Offline Features

1. Open Chrome DevTools (F12)
2. Go to Application tab
3. Check Service Worker registration
4. Enable "Offline" mode in Network tab
5. Try browsing products and adding to cart

## Troubleshooting

### MongoDB Connection Issues

If you see "MongoDB connection error":
- Make sure MongoDB is running: `mongod` or via Docker
- Check connection string in `.env` file
- Try: `mongodb://127.0.0.1:27017/pwa-shop`

### Port Already in Use

- Change PORT in `.env` for backend
- Update CORS_ORIGIN to match
- React will auto-use next available port (3001, 3002, etc.)










