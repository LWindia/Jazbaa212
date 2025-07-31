# Nodemailer Setup Guide - Real Email Sending

## Problem
You want to send real emails using Nodemailer instead of EmailJS for better reliability and security.

## Solution
I've updated your system to use Nodemailer with your existing Express server for server-side email sending.

## What I've Done

### ✅ **Updated Server (`server/index.js`)**
Added new endpoints:
- `/api/send-invite` - Sends invite emails
- `/api/send-welcome` - Sends welcome emails  
- `/api/test-email` - Tests email connection

### ✅ **Updated Frontend (`src/services/realEmailService.ts`)**
- Changed from EmailJS to Nodemailer server calls
- Added proper error handling
- Updated API endpoints

## Setup Steps

### 1. Gmail App Password Setup
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Factor Authentication** (if not already enabled)
3. Go to **Security** → **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "JAZBAA Email Service" as the name
6. Copy the **16-character password**

### 2. Environment Variables
Create a `.env` file in your server directory:

```bash
# server/.env
GMAIL_APP_PASSWORD=your_16_character_app_password_here
```

### 3. Test Locally
```bash
# Start the server
cd server
npm start

# In another terminal, start the frontend
npm run dev
```

### 4. Deploy Server
Deploy your server to a hosting service:

#### Option A: Railway (Recommended)
1. Go to [Railway.app](https://railway.app/)
2. Connect your GitHub repository
3. Set environment variable: `GMAIL_APP_PASSWORD`
4. Deploy

#### Option B: Render
1. Go to [Render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set environment variable: `GMAIL_APP_PASSWORD`
5. Deploy

### 5. Update Frontend Configuration
After deploying your server, update the API URL in `src/services/realEmailService.ts`:

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-server-url.com'  // Replace with your server URL
  : 'http://localhost:3001';
```

## Testing

### 1. Test Email Connection
1. Go to `https://www.lwjazbaa.com/admin/email-test`
2. Click "Test Email Connection"
3. Check if the test passes

### 2. Test Invite Sending
1. Go to `https://www.lwjazbaa.com/admin/invite`
2. Send an invite to your email
3. Check if you receive the email

## Benefits of Nodemailer over EmailJS

### ✅ **Security**
- Server-side processing (no client-side API keys)
- Better authentication handling
- More secure credential management

### ✅ **Reliability**
- Better error handling
- More reliable delivery
- Better spam score

### ✅ **Customization**
- Full control over email templates
- Custom HTML emails
- Better formatting options

### ✅ **Cost**
- No third-party service fees
- No API call limits
- Full control over email sending

## Troubleshooting

### If emails don't send:

1. **Check Gmail Settings:**
   - Ensure 2FA is enabled
   - Verify app password is correct
   - Check if Gmail is blocking the connection

2. **Check Server Logs:**
   - Look for error messages in server console
   - Check deployment logs

3. **Test Environment Variables:**
   - Ensure `GMAIL_APP_PASSWORD` is set correctly
   - Test locally first

4. **Check Network:**
   - Ensure server can reach Gmail SMTP
   - Check firewall settings

## Expected Results

After setup:
- ✅ Invite emails sent automatically
- ✅ Welcome emails sent automatically
- ✅ Beautiful HTML email templates
- ✅ Professional email delivery
- ✅ No manual link copying needed

## Next Steps

1. Set up Gmail app password
2. Deploy server to hosting service
3. Update frontend API URL
4. Test email functionality
5. Deploy frontend changes

Your email system will now send real, professional emails using Nodemailer! 