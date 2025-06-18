# Deployment Guide for Real-time Code Editor

## Issues Fixed

The socket connection issues you were experiencing were caused by:

1. **Missing root server.js file** - The production build was looking for `server.js` in the root directory
2. **Hardcoded CORS origins** - Server only allowed localhost connections
3. **Missing environment variables** - Frontend couldn't find the backend URL
4. **Vercel deployment configuration** - Missing proper Vercel configuration

## Steps to Deploy

### 1. Update Your Vercel Domain

In the `server.js` file, replace `https://your-vercel-app.vercel.app` with your actual Vercel domain:

```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://your-actual-app-name.vercel.app', 'http://localhost:5173']
  : "http://localhost:5173",
```

### 2. Set Environment Variables in Vercel

In your Vercel dashboard, go to your project settings and add these environment variables:

- `VITE_BACKEND_URL`: `https://your-actual-app-name.vercel.app`
- `NODE_ENV`: `production`

### 3. Deploy to Vercel

```bash
# Install dependencies
npm install

# Deploy to Vercel
vercel --prod
```

### 4. Alternative: Use a Separate Backend Service

For better WebSocket support, consider deploying your backend separately:

**Option A: Deploy backend to Railway/Render/Heroku**

1. Deploy only the backend (`server.js`) to a service that supports WebSockets
2. Set `VITE_BACKEND_URL` to your backend service URL
3. Deploy frontend to Vercel

**Option B: Use Socket.io Cloud Service**

1. Use a service like [Socket.io Cloud](https://cloud.socket.io/) or [Pusher](https://pusher.com/)
2. Update the socket configuration to use the cloud service

## Testing

After deployment:

1. Open your app on different devices
2. Create a new room
3. Share the room ID with another device
4. Verify real-time code editing works

## Troubleshooting

If you still have issues:

1. **Check browser console** for connection errors
2. **Verify environment variables** are set correctly in Vercel
3. **Check CORS settings** match your actual domain
4. **Test with different browsers** to rule out browser-specific issues

## Local Development

For local development, the app will automatically use `http://localhost:5000` as the backend URL.
