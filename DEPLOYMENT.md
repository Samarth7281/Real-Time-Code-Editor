# Deployment Guide for Real-time Code Editor

## Current Issue

Vercel doesn't support persistent WebSocket connections, which is why you're getting "not found" errors when trying to access your deployed app.

## Fixed Issues

### 1. MIME Type Error (Fixed)

The error "Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html"" has been fixed by:

- Updated `vercel.json` with proper static file routing
- Added correct headers for asset caching
- Updated `vite.config.js` for proper build configuration

### 2. WebSocket Connection Issue (Solution Below)

Vercel doesn't support persistent WebSocket connections, so we need a separate backend service.

## Solution: Keep Same Structure + Separate WebSocket Service

### Option 1: Deploy Backend to Railway (Recommended)

1. **Deploy Backend to Railway:**

   ```bash
   # Create a new directory for backend
   mkdir real-time-code-editor-backend
   cd real-time-code-editor-backend

   # Copy backend files
   cp ../real-time-code-editor/backend-server.js ./server.js
   cp ../real-time-code-editor/backend-package.json ./package.json
   cp -r ../real-time-code-editor/src/backend ./src/

   # Deploy to Railway
   # Go to railway.app, create new project, connect your GitHub repo
   ```

2. **Update Frontend Configuration:**

   - Get your Railway backend URL (e.g., `https://your-app.railway.app`)
   - Set environment variable in Vercel:
     - Go to your Vercel project settings
     - Add environment variable: `VITE_BACKEND_URL=https://your-app.railway.app`

3. **Deploy Frontend to Vercel:**
   ```bash
   vercel --prod
   ```

### Option 2: Use Socket.io Cloud Service

1. **Sign up for Socket.io Cloud:**

   - Go to https://cloud.socket.io/
   - Create a free account
   - Get your connection URL

2. **Update Frontend Configuration:**
   - Set `VITE_BACKEND_URL` to your Socket.io Cloud URL
   - Deploy to Vercel

### Option 3: Use Pusher

1. **Sign up for Pusher:**

   - Go to https://pusher.com/
   - Create a free account
   - Get your app credentials

2. **Update Code for Pusher:**
   - Install: `npm install pusher pusher-js`
   - Replace Socket.io with Pusher implementation

## Quick Fix for Current Deployment

To get your current deployment working immediately:

1. **Deploy Backend to Railway:**

   - Use the `backend-server.js` and `backend-package.json` files
   - Deploy to Railway (free tier available)

2. **Set Environment Variable:**

   - In Vercel dashboard, add: `VITE_BACKEND_URL=https://your-railway-app.railway.app`

3. **Redeploy Frontend:**
   ```bash
   vercel --prod
   ```

## Testing

After deployment:

1. Open your app on different devices
2. Create a new room
3. Share the room ID with another device
4. Verify real-time code editing works

## Troubleshooting

### MIME Type Error (Fixed)

- ✅ Updated `vercel.json` with proper routing
- ✅ Added asset caching headers
- ✅ Updated Vite configuration

### WebSocket Connection Issues

If you still have WebSocket issues:

1. Check browser console for connection errors
2. Verify environment variables are set correctly
3. Ensure CORS is configured properly on backend
4. Test WebSocket connection using browser dev tools

### Common Issues

1. **"Module not found" errors**: Make sure all dependencies are installed
2. **CORS errors**: Check that backend CORS includes your Vercel domain
3. **Socket connection timeouts**: Verify backend URL is correct and accessible

## File Structure (Kept Same)

```
real-time-code-editor/
├── src/
│   ├── backend/
│   │   ├── socket.js (updated for external service)
│   │   └── actions.js
│   ├── components/
│   ├── pages/
│   └── ...
├── server.js (for local development)
├── backend-server.js (for Railway deployment)
├── backend-package.json (for Railway deployment)
├── vercel.json (updated for static build + proper routing)
├── vite.config.js (updated for proper build)
└── package.json
```

This approach keeps your existing structure while making it compatible with Vercel's limitations and fixing the MIME type error.
