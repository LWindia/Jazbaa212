# JAZBAA Email Setup Complete Guide

## ✅ Setup Status: COMPLETE

Your email system is now fully configured to send all contact form submissions to `technical@lwindia.com`. Here's what has been implemented:

## 🔧 What's Been Configured

### 1. Environment Variables
- **Email User**: `technical@lwindia.com`
- **Email Password**: `eohq wlwi dgbd svxk`
- **Server Port**: `3002`

### 2. Email Functionality
- ✅ All contact forms now send emails to `technical@lwindia.com`
- ✅ Works for both localhost and production deployment
- ✅ Automatic confirmation emails sent to users
- ✅ Professional HTML email templates with JAZBAA branding

### 3. Contact Form Types Supported
- **Contact Founders** - General inquiries about startups
- **Call Us** - Schedule calls with the team
- **Request Detailed Deck** - Pitch deck requests
- **Support via CSR** - Corporate social responsibility inquiries

## 🚀 How It Works

### For Localhost Development:
1. Start the server: `npm run server`
2. Start the frontend: `npm run dev`
3. Forms will send emails via `http://localhost:3002/api/contact`

### For Production Deployment:
1. Forms automatically detect production environment
2. Emails sent via `https://www.lwjazbaa.com/api/contact`
3. Vercel serverless function handles email sending

## 📧 Email Flow

### When someone fills a contact form:

1. **Form Submission** → API endpoint receives data
2. **Admin Notification** → Email sent to `technical@lwindia.com` with:
   - Contact details (name, email, phone)
   - Message content
   - Contact type (founders/call/deck/csr)
   - Timestamp
   - Reply-to set to user's email

3. **User Confirmation** → Email sent to the person who filled the form with:
   - Confirmation of receipt
   - Their submitted message
   - Expected response time (24-48 hours)

## 🎯 Pages with Contact Forms

### 1. Startup Profile Pages
- **URL Pattern**: `/startup/[startup-name]`
- **Contact Buttons**: Contact Founders, Call Us, Request Deck, Support via CSR
- **Example**: `lwjazbaa.com/startup/scrapjii`

### 2. Main Landing Pages
- **Contact Founders** button on main pages
- **All contact forms** send emails to your address

## 🔍 Testing the Setup

### Test Email Functionality:
```bash
# Start the server
npm run server

# In another terminal, start the frontend
npm run dev
```

### Test Steps:
1. Go to any startup page (e.g., `localhost:3000/startup/scrapjii`)
2. Click any contact button (Contact Founders, Call Us, etc.)
3. Fill out the form and submit
4. Check your email (`technical@lwindia.com`) for the notification
5. Check the user's email for the confirmation

## 📋 Email Template Features

### Admin Email Includes:
- JAZBAA branding and colors
- Contact type and description
- Full contact details
- User's message
- Action required notice
- Reply-to set to user's email

### User Confirmation Email Includes:
- Thank you message
- Their submitted message
- Response time expectation
- Professional JAZBAA branding

## 🛠️ Troubleshooting

### If emails aren't working:

1. **Check .env file exists**:
   ```bash
   cat .env
   # Should show:
   # EMAIL_USER=technical@lwindia.com
# EMAIL_PASSWORD=eohq wlwi dgbd svxk
# PORT=3002
   ```

2. **Check server is running**:
   ```bash
   npm run server
   # Should show: "Server running on port 3002"
   ```

3. **Check browser console** for any API errors

4. **Verify email credentials** are correct

## 🔒 Security Notes

- Email credentials are stored in `.env` file (not in code)
- `.env` file is in `.gitignore` (not committed to repository)
- All emails include proper headers and security measures

## 📞 Support

If you encounter any issues:
1. Check the server logs for error messages
2. Verify the `.env` file configuration
3. Test with a simple form submission
4. Check your email spam folder

## 🎉 Success!

Your email system is now fully operational. All contact form submissions from any startup page (both localhost and production) will be sent to `technical@lwindia.com` with professional formatting and user confirmations. 