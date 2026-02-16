# Deployment Guide

This guide explains how to deploy your Real Estate Portfolio application to a hosting platform.

## 📋 Prerequisites

Before deploying, ensure you have:
- A hosting platform account (Vercel, Netlify, Railway, Render, etc.)
- Your database ready (or use the hosting platform's database service)
- Both frontend and backend code ready

## 🔧 Configuration

### Backend Configuration

1. **Create `.env` file** in the `server` directory:
```env
PORT=5000
ALLOWED_ORIGINS=https://your-frontend-domain.com
DATABASE_URL=your-database-connection-string
```

**Important Environment Variables:**
- `PORT`: Server port (default: 5000)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend URLs (e.g., `https://myapp.vercel.app,https://myapp.com`)
- `DATABASE_URL`: Your database connection string

### Frontend Configuration

1. **Create `.env` file** in the `client` directory:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

**Important Environment Variables:**
- `VITE_API_URL`: Your backend API URL (must end with `/api`)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Frontend)

**Frontend Deployment:**
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `client` directory
3. Run: `vercel`
4. Set environment variable in Vercel dashboard:
   - `VITE_API_URL` = your backend URL

**Backend Deployment:**
1. Navigate to `server` directory
2. Run: `vercel`
3. Set environment variables in Vercel dashboard:
   - `PORT`, `ALLOWED_ORIGINS`, `DATABASE_URL`

### Option 2: Railway (Good for Full-Stack)

1. Create account at [railway.app](https://railway.app)
2. Create two services: one for backend, one for frontend
3. Connect your GitHub repository
4. Set environment variables for each service
5. Deploy

### Option 3: Render

1. Create account at [render.com](https://render.com)
2. Create a **Web Service** for backend
3. Create a **Static Site** for frontend
4. Set environment variables in each service's settings
5. Deploy

### Option 4: Traditional VPS (DigitalOcean, AWS, etc.)

**Backend:**
```bash
cd server
npm install
npm start
```

**Frontend:**
```bash
cd client
npm install
npm run build
# Serve the 'dist' folder with nginx or similar
```

## 📝 Build Commands

### Backend
- **Install**: `npm install`
- **Start**: `npm start`
- **Root Directory**: `server`

### Frontend
- **Install**: `npm install`
- **Build**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `client`

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible at your backend URL
- [ ] Frontend is accessible at your frontend URL
- [ ] Environment variables are set correctly on both services
- [ ] CORS is configured with your frontend domain
- [ ] Database is connected and accessible
- [ ] Images upload and display correctly
- [ ] API calls work from frontend to backend

## 🔍 Troubleshooting

**CORS Errors:**
- Ensure `ALLOWED_ORIGINS` in backend includes your frontend domain
- Check that frontend domain matches exactly (including https://)

**Images Not Loading:**
- Verify `VITE_API_URL` is set correctly in frontend
- Check that backend `/uploads` route is accessible

**API Connection Failed:**
- Verify backend is running and accessible
- Check `VITE_API_URL` environment variable
- Ensure backend URL ends with `/api`

## 🌐 Example Configuration

**Development:**
```
Backend: http://localhost:5000
Frontend: http://localhost:5173
```

**Production:**
```
Backend: https://api.myrealestate.com
Frontend: https://myrealestate.com

Backend .env:
ALLOWED_ORIGINS=https://myrealestate.com

Frontend .env:
VITE_API_URL=https://api.myrealestate.com/api
```
