# Deployment Guide - Fix 404 Errors

## Problem
Your admin pages (`/admin/invite`, `/admin/email-test`, etc.) are showing 404 errors on the deployed website but work fine on localhost.

## Solution
The issue is with Firebase hosting configuration. I've updated your `firebase.json` to include proper rewrite rules for client-side routing.

## Updated Files

### 1. firebase.json
Added hosting configuration with rewrite rules:
```json
{
  "storage": {
    "rules": "storage.rules"
  },
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 2. .firebaserc
Created to ensure proper project configuration:
```json
{
  "projects": {
    "default": "lwjazbaa"
  }
}
```

### 3. package.json
Added deployment scripts:
- `npm run deploy` - Build and deploy everything
- `npm run deploy:hosting` - Build and deploy only hosting

## Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase:**
   ```bash
   npm run deploy:hosting
   ```
   
   Or use the full deploy command:
   ```bash
   npm run deploy
   ```

3. **Verify deployment:**
   - Wait a few minutes for the changes to propagate
   - Test the admin pages:
     - https://www.lwjazbaa.com/admin/invite
     - https://www.lwjazbaa.com/admin/email-test

## What the Fix Does

The rewrite rule `"source": "**"` tells Firebase hosting to serve the `index.html` file for all routes. This allows React Router to handle client-side routing properly, instead of the server trying to find actual files for each route.

## Troubleshooting

If you still get 404 errors after deployment:

1. **Clear browser cache** - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
2. **Check Firebase console** - Ensure deployment was successful
3. **Wait 5-10 minutes** - Sometimes changes take time to propagate
4. **Check Firebase project ID** - Ensure `.firebaserc` has the correct project ID

## Alternative: Manual Deployment

If the npm scripts don't work, you can deploy manually:

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## Expected Result

After deployment, all your admin routes should work:
- ✅ `/admin/invite`
- ✅ `/admin/email-test`
- ✅ `/admin/auth-test`
- ✅ `/admin/profile-manager`
- ✅ All other admin routes

The rewrite rules ensure that React Router handles all client-side routing properly. 