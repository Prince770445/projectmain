# ✅ Vercel Deployment Checklist

## 📦 Files Created/Modified

### ✅ Created:
- `vercel.json` - Vercel configuration
- `api/index.js` - Serverless function handler
- `VERCEL_DEPLOYMENT.md` - Complete deployment guide
- `VERCEL_QUICK_START.md` - Quick reference
- `.gitignore` - Updated to exclude sensitive files

### ✅ Modified:
- `frontend/package.json` - Added `vercel-build` script
- `frontend/src/services/api.js` - Updated to use relative URLs in production
- `package.json` - Added `vercel-build` script

---

## 🚀 Next Steps to Deploy

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### 2. Set Up MongoDB Atlas
- [ ] Create account at https://www.mongodb.com/cloud/atlas
- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IP: `0.0.0.0/0`
- [ ] Copy connection string

### 3. Deploy on Vercel
- [ ] Go to https://vercel.com/new
- [ ] Import GitHub repository
- [ ] Configure build settings:
  - Build Command: `cd frontend && npm run build`
  - Output Directory: `frontend/build`
  - Install Command: `npm install && cd frontend && npm install && cd ../backend && npm install`

### 4. Add Environment Variables
Add in Vercel Dashboard → Settings → Environment Variables:

- [ ] `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/pwa-shop`
- [ ] `JWT_SECRET` = (generate secure random string)
- [ ] `NODE_ENV` = `production`
- [ ] `CORS_ORIGIN` = (optional - your Vercel URL)

### 5. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Note your deployment URL

### 6. Seed Database
- [ ] Create `backend/.env` with `MONGODB_URI`
- [ ] Run `cd backend && node scripts/seed.js`
- [ ] Verify data in MongoDB Atlas

### 7. Test
- [ ] Visit your Vercel URL
- [ ] Test API: `curl https://your-app.vercel.app/api/health`
- [ ] Test login with demo credentials
- [ ] Browse products
- [ ] Test cart functionality

---

## 🔧 Generate JWT_SECRET

Run this command to generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📝 Important Notes

1. **All Dependencies Installed**: Make sure both `frontend/node_modules` and `backend/node_modules` exist
2. **Environment Variables**: Never commit `.env` files - use Vercel's environment variables
3. **Database**: Use MongoDB Atlas for production (free tier available)
4. **CORS**: Frontend and API are on the same domain, so CORS should work automatically

---

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify build command is correct
- Check Vercel build logs

### API Returns 404
- Verify `api/index.js` exists
- Check Vercel function logs
- Ensure routes are correctly configured

### MongoDB Connection Error
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Verify environment variable is set correctly

---

## ✅ Success Indicators

- ✅ Build completes without errors
- ✅ API health check returns: `{"status":"ok"}`
- ✅ Frontend loads correctly
- ✅ Can register/login
- ✅ Products load from database
- ✅ Cart functionality works

---

## 📞 Need Help?

1. Check `VERCEL_DEPLOYMENT.md` for detailed instructions
2. Check `VERCEL_QUICK_START.md` for quick reference
3. Review Vercel logs in dashboard
4. Check MongoDB Atlas connection status

---

**Ready to deploy!** 🚀



