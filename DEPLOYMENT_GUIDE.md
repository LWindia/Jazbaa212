# 🚀 Vercel Deployment Guide - Email Server Setup

## 🎯 Problem
Your email system works on localhost but not on Vercel deployment because the email server needs to be deployed separately.

## ✅ Solution
Deploy your email server to a hosting service and update the frontend to use the production server URL.

## 🎯 Step-by-Step Deployment

### **Step 1: Deploy Email Server to Railway (Recommended)**

1. **Go to Railway.app:**
   - Visit https://railway.app/
   - Sign up/Login with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your Jazbaa repository

3. **Configure Environment Variables:**
   - Go to your project settings
   - Add these environment variables:
   ```
   EMAIL_USER=technical@lwindia.com
   EMAIL_PASSWORD=eohq wlwi dgbd svxk
   PORT=3000
   ```

4. **Deploy:**
   - Railway will automatically detect your server
   - Deploy the project
   - Get your production URL (e.g., `https://jazbaa-email-server.railway.app`)

### **Step 2: Update Frontend Configuration**

After deploying the server, update your frontend to use the production server URL:

```typescript
// src/services/realEmailService.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://jazbaa-email-server.railway.app'  // Replace with your Railway URL
  : 'http://localhost:3002';
```

### **Step 3: Alternative - Deploy to Render**

If Railway doesn't work, try Render:

1. **Go to Render.com:**
   - Visit https://render.com/
   - Sign up/Login with GitHub

2. **Create New Web Service:**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Service:**
   - **Name:** `jazbaa-email-server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`

4. **Add Environment Variables:**
   ```
   EMAIL_USER=technical@lwindia.com
   EMAIL_PASSWORD=eohq wlwi dgbd svxk
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment
   - Get your production URL

### **Step 4: Update Frontend for Production**

After getting your server URL, update the frontend:

```typescript
// src/services/realEmailService.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-server-url.render.com'  // Replace with your actual URL
  : 'http://localhost:3002';
```

### **Step 5: Deploy Frontend to Vercel**

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "Update email server URL for production"
   git push origin main
   ```

2. **Vercel will auto-deploy** with the new configuration

## 🧪 Testing the Deployment

### **1. Test Server Health:**
```bash
curl https://your-server-url.railway.app/api/health
```

### **2. Test Email Function:**
```bash
curl -X POST https://your-server-url.railway.app/api/test-email \
  -H "Content-Type: application/json"
```

### **3. Test from Production Website:**
1. Go to `https://www.lwjazbaa.com/admin/invite`
2. Send an invite to your email
3. Check if you receive the email

## 🔧 Troubleshooting

### **If emails still don't work:**

1. **Check Server Logs:**
   - Go to Railway/Render dashboard
   - Check deployment logs for errors

2. **Verify Environment Variables:**
   - Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are set correctly
   - Check if the email credentials are working

3. **Test Server Directly:**
   ```bash
   curl -X POST https://your-server-url.railway.app/api/send-invite \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","token":"test-123"}'
   ```

4. **Check CORS Issues:**
   - Ensure your server allows requests from `https://www.lwjazbaa.com`
   - Update CORS configuration if needed

## 📋 Quick Deployment Checklist

- ✅ Deploy email server to Railway/Render
- ✅ Set environment variables (EMAIL_USER, EMAIL_PASSWORD)
- ✅ Get production server URL
- ✅ Update frontend API_BASE_URL
- ✅ Deploy frontend to Vercel
- ✅ Test email functionality
- ✅ Verify emails are received

## 🎉 Expected Results

After deployment:
- ✅ Emails sent from production website
- ✅ Professional HTML templates
- ✅ Working invite links
- ✅ Automatic email delivery
- ✅ Production domain links

## 🚀 Alternative: Vercel Serverless Functions

If you prefer to keep everything on Vercel, you can create serverless functions:

1. **Create `api/send-invite.js` in your project**
2. **Create `api/send-welcome.js` in your project**
3. **Create `api/test-email.js` in your project**

This way everything stays on Vercel, but requires more setup.

**Choose the Railway/Render approach for simplicity!** 