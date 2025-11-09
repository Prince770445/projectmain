# 🔐 Environment Variables Configuration

## Backend Environment Variables

Add these environment variables in your deployment platform (Vercel, Railway, Render, etc.):

### Required Variables:

| Key | Value | Description |
|-----|-------|-------------|
| `PORT` | `5000` | Server port (or use platform's default) |
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/pwa-shop` | MongoDB Atlas connection string (for production) |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production` | Secret key for JWT token signing (use a strong random string) |
| `NODE_ENV` | `production` | Environment mode |
| `CORS_ORIGIN` | `https://your-frontend-domain.vercel.app` | Frontend URL for CORS (replace with your actual frontend URL) |

### For Local Development:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb://localhost:27017/pwa-shop` |
| `JWT_SECRET` | `your-secret-key-here` |
| `NODE_ENV` | `development` |
| `CORS_ORIGIN` | `http://localhost:3000` |

---

## Frontend Environment Variables (if deploying separately)

| Key | Value | Description |
|-----|-------|-------------|
| `REACT_APP_API_URL` | `https://your-backend-api.railway.app` | Backend API URL (replace with your actual backend URL) |

---

## 📋 Quick Copy-Paste Format

### For Backend Deployment:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pwa-shop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### For Frontend Deployment (if separate):

```
REACT_APP_API_URL=https://your-backend-api.railway.app
```

---

## 🔑 How to Generate JWT_SECRET

Generate a secure random string for JWT_SECRET:

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Using OpenSSL:**
```bash
openssl rand -hex 64
```

**Online Generator:**
- Visit: https://generate-secret.vercel.app/64

---

## 📝 MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist IP address (0.0.0.0/0 for all, or your server IP)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/pwa-shop`
6. Replace `username`, `password`, and `cluster` with your actual values

---

## ⚠️ Important Notes

- **Never commit `.env` files to Git** - they contain sensitive information
- **Use different JWT_SECRET for production** - don't use the example value
- **Update CORS_ORIGIN** - must match your frontend URL exactly
- **MongoDB Atlas** - Required for production (free tier available)
- **Environment variables are case-sensitive**

---

## 🧪 Testing Environment Variables

After setting up, test your backend:
```bash
curl https://your-backend-api.railway.app/api/products
```

Should return product data if configured correctly.



