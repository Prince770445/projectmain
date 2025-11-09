# 🚀 Deploy to Vercel - Complete Guide

## 📋 Prerequisites

1. **GitHub Account** - Your code should be on GitHub
2. **Vercel Account** - Sign up at https://vercel.com
3. **MongoDB Atlas** - Free cluster at https://www.mongodb.com/cloud/atlas

---

## 🎯 Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

---

## 🎯 Step 2: Create MongoDB Atlas Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user:
   - Database Access → Add New User
   - Username: `your-username`
   - Password: `your-secure-password` (save this!)
5. Whitelist IP addresses:
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your password
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/pwa-shop?retryWrites=true&w=majority`

---

## 🎯 Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**
   - Select your repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset:** Other
   - **Root Directory:** Leave as root (`.`)
   - **Build Command:** `cd frontend && npm run build`
   - **Output Directory:** `frontend/build`
   - **Install Command:** `npm install && cd frontend && npm install && cd ../backend && npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/pwa-shop?retryWrites=true&w=majority` |
   | `JWT_SECRET` | Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
   | `NODE_ENV` | `production` |
   | `CORS_ORIGIN` | Leave empty (will use your Vercel URL) |

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-5 minutes)

### Option B: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add NODE_ENV
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## 🎯 Step 4: Configure Build Settings in Vercel Dashboard

After initial deployment, go to Project Settings → Build & Output Settings:

### Build Command:
```
cd frontend && npm run build
```

### Output Directory:
```
frontend/build
```

### Install Command:
```
npm install && cd frontend && npm install && cd ../backend && npm install
```

---

## 🎯 Step 5: Seed Your Database

After deployment, you need to seed your database with initial data:

### Option A: Run Seed Script Locally (Pointing to Atlas)

1. Create `.env` file in `backend/` directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pwa-shop
   ```

2. Run seed script:
   ```bash
   cd backend
   npm install
   node scripts/seed.js
   ```

### Option B: Use MongoDB Compass
- Connect to your Atlas cluster
- Manually insert data from `backend/scripts/seed.js`

---

## 🎯 Step 6: Test Your Deployment

1. **Visit your Vercel URL**
   - Format: `https://your-project-name.vercel.app`

2. **Test API Endpoints**
   ```bash
   curl https://your-project-name.vercel.app/api/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

3. **Test Frontend**
   - Open your Vercel URL in browser
   - Try registering/login
   - Browse products

---

## 🔧 Troubleshooting

### Build Fails

**Error: Cannot find module**
- Make sure all dependencies are installed
- Check that `backend/node_modules` and `frontend/node_modules` exist

**Solution:**
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### API Routes Return 404

**Check:**
1. Verify `api/index.js` exists
2. Check Vercel logs: Project → Deployments → View Function Logs
3. Ensure routes are correct in `api/index.js`

### MongoDB Connection Fails

**Check:**
1. MongoDB Atlas connection string is correct
2. IP address is whitelisted (0.0.0.0/0)
3. Database user credentials are correct
4. Environment variable `MONGODB_URI` is set in Vercel

### CORS Errors

**Solution:**
- Update `CORS_ORIGIN` in Vercel environment variables to your Vercel URL
- Or leave empty and update `api/index.js` to accept your domain

---

## 📝 Environment Variables Summary

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pwa-shop
JWT_SECRET=your-generated-secret-key-here
NODE_ENV=production
CORS_ORIGIN=https://your-project-name.vercel.app
```

---

## 🎉 Success!

Your app should now be live at:
- **Frontend:** `https://your-project-name.vercel.app`
- **API:** `https://your-project-name.vercel.app/api`

### Demo Credentials:
- Email: `demo@example.com`
- Password: `password123`

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

---

## 🔄 Updating Your Deployment

Every time you push to GitHub:
1. Vercel automatically detects changes
2. Creates a new deployment
3. Runs build process
4. Deploys if successful

Or manually trigger:
```bash
vercel --prod
```

---

## ⚠️ Important Notes

1. **Free Tier Limits:**
   - 100GB bandwidth/month
   - Serverless functions: 100GB-hours/month
   - Perfect for small to medium projects

2. **Database:**
   - Use MongoDB Atlas free tier (512MB storage)
   - Or upgrade as needed

3. **Environment Variables:**
   - Never commit `.env` files
   - Always use Vercel's environment variables

4. **Build Time:**
   - First build: ~5 minutes
   - Subsequent builds: ~2-3 minutes



