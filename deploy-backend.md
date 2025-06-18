# Backend Deployment Guide

## Step 1: Create GitHub Repository for Backend

1. Go to GitHub and create a new repository called `real-time-code-editor-backend`
2. Don't initialize with README (we already have one)

## Step 2: Push Backend Code to GitHub

```bash
cd real-time-code-editor-backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/real-time-code-editor-backend.git
git push -u origin main
```

## Step 3: Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `real-time-code-editor-backend` repository
6. Railway will automatically detect it's a Node.js app and deploy

## Step 4: Get Your Railway URL

1. After deployment, Railway will give you a URL like:
   `https://your-app-name.railway.app`
2. Copy this URL

## Step 5: Update Vercel Environment Variable

1. Go to your Vercel dashboard
2. Select your `real-time-code-editor` project
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: `https://your-app-name.railway.app`
   - **Environment**: Production (and Preview if you want)
5. Save

## Step 6: Redeploy Frontend

```bash
vercel --prod
```

## Step 7: Test

1. Open your Vercel app on different devices
2. Create a room and share the room ID
3. Test real-time code editing

## Troubleshooting

### If Railway deployment fails:

- Check that all files are pushed to GitHub
- Verify `package.json` has correct dependencies
- Check Railway logs for errors

### If socket connection still fails:

- Verify the Railway URL is correct in Vercel environment variables
- Check browser console for connection errors
- Test the Railway health endpoint: `https://your-app.railway.app/health`

### If CORS errors occur:

- Make sure your Vercel domain is in the CORS configuration
- Check that the Railway URL is accessible
