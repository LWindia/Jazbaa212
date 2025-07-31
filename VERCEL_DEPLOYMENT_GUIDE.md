# Vercel Deployment Fix - Admin Routes 404 Error

## Problem
Your admin dashboard and routes work locally but show 404 errors when deployed on Vercel.

## Root Cause
Vercel needs proper configuration to handle client-side routing with React Router. Without `vercel.json`, Vercel tries to find actual files for each route instead of serving the main `index.html` file.

## Solution Files Created/Updated

### 1. vercel.json (NEW)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 2. vite.config.ts (UPDATED)
Added build optimization for Vercel:
```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
```

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Fix Vercel routing with vercel.json"
   git push origin main
   ```

2. **Vercel will automatically redeploy** with the new configuration

### Option 2: Manual Redeploy
1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Select your project

2. **Redeploy:**
   - Click "Redeploy" button
   - Or trigger a new deployment

### Option 3: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## What the Fix Does

### vercel.json Rewrite Rule
```json
"source": "/(.*)"
"destination": "/index.html"
```

This tells Vercel to serve your `index.html` file for ALL routes, allowing React Router to handle client-side routing properly.

## Expected Results

After deployment, these routes should work:
- ✅ `https://www.lwjazbaa.com/admin/invite`
- ✅ `https://www.lwjazbaa.com/admin/email-test`
- ✅ `https://www.lwjazbaa.com/admin/auth-test`
- ✅ `https://www.lwjazbaa.com/admin/profile-manager`
- ✅ All other admin routes

## Troubleshooting

### If routes still don't work:

1. **Clear browser cache** - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
2. **Check Vercel deployment logs** - Ensure build was successful
3. **Wait 2-3 minutes** - Sometimes changes take time to propagate
4. **Verify vercel.json is in root** - Should be in project root directory

### Check Deployment Status:
1. Go to Vercel Dashboard
2. Check deployment logs for any errors
3. Ensure `vercel.json` is included in the deployment

## Alternative: Environment Variables

If you have environment variables, make sure they're configured in Vercel:
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add any required environment variables

## Testing

After deployment, test these URLs:
- Home: `https://www.lwjazbaa.com/`
- Admin Dashboard: `https://www.lwjazbaa.com/admin-dashboard`
- Invite Page: `https://www.lwjazbaa.com/admin/invite`
- Email Test: `https://www.lwjazbaa.com/admin/email-test`

All should work without 404 errors! 