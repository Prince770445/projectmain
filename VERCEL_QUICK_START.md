# ⚡ Quick Vercel Deployment

## 🚀 3-Step Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel"
git push
```

### 2. Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Build Command:** `cd frontend && npm run build`
   - **Output Directory:** `frontend/build`
   - **Install Command:** `npm install && cd frontend && npm install && cd ../backend && npm install`

### 3. Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `NODE_ENV` | `production` |

### 4. Deploy & Done! 🎉

Visit your app at: `https://your-project.vercel.app`

---

## 📝 MongoDB Atlas Setup (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string
6. Paste in Vercel environment variables

---

## ✅ Test After Deployment

```bash
# Test API
curl https://your-project.vercel.app/api/health

# Should return: {"status":"ok","timestamp":"..."}
```

---

## 🌱 Seed Database

After deployment, run locally (pointing to Atlas):
```bash
cd backend
# Create .env with MONGODB_URI
node scripts/seed.js
```

Demo login:
- Email: `demo@example.com`
- Password: `password123`



