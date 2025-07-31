# EmailJS Setup Guide - Fix Email Sending

## Problem
You're sending invites from the admin panel but not receiving actual emails. The system is currently in "simulated" mode.

## Solution
Set up EmailJS to send real emails automatically.

## Step-by-Step Setup

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **"Add New Service"**
3. Select **Gmail**
4. Connect your Gmail account (`intern.linuxworld@gmail.com`)
5. **Copy the Service ID** (it will look like `service_xxxxxxx`)

### 3. Create Email Templates

#### Template 1: Invite Email
1. Go to **Email Templates**
2. Click **"Create New Template"**
3. Set **Template ID**: `template_invite`
4. Set **Subject**: `🎉 You're Invited to Join JAZBAA 4.0!`
5. Set **Body**:
```
Dear {{to_name}},

You have been invited to join JAZBAA 4.0 - The Creator Movement of India!

Click the link below to register your startup and create your profile:
{{invite_link}}

Best regards,
{{from_name}}
```

#### Template 2: Welcome Email
1. Click **"Create New Template"**
2. Set **Template ID**: `template_welcome`
3. Set **Subject**: `🎉 Welcome to JAZBAA 4.0, {{startup_name}}!`
4. Set **Body**:
```
Dear {{to_name}},

Welcome to JAZBAA 4.0! Your startup "{{startup_name}}" has been successfully registered.

View your profile at the link below:
{{profile_link}}

Best regards,
{{from_name}}
```

### 4. Get Your API Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key**

### 5. Update Configuration
Replace the placeholder in `src/services/realEmailService.ts`:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxxxxxx', // Your actual service ID
  TEMPLATE_ID_INVITE: 'template_invite',
  TEMPLATE_ID_WELCOME: 'template_welcome',
  PUBLIC_KEY: 'your_actual_public_key_here' // Your actual public key
};
```

## Quick Setup Commands

After setting up EmailJS, update your configuration:

```bash
# Edit the email service file
code src/services/realEmailService.ts
```

Replace these values:
- `service_lwjazbaa` → Your actual Service ID
- `YOUR_EMAILJS_PUBLIC_KEY` → Your actual Public Key

## Test the Setup

1. **Go to your admin panel**: `https://www.lwjazbaa.com/admin/email-test`
2. **Click "Test Email Connection"**
3. **Send a test invite**: Go to `/admin/invite` and send an invite
4. **Check your email**: You should receive the actual email

## Troubleshooting

### If emails still don't work:

1. **Check EmailJS Dashboard**:
   - Go to EmailJS dashboard
   - Check "Activity" section for any errors

2. **Verify Gmail Settings**:
   - Enable "Less secure app access" in Gmail
   - Or use App Password if 2FA is enabled

3. **Check Browser Console**:
   - Open browser developer tools
   - Look for any EmailJS errors

4. **Test with Different Email**:
   - Try sending to a different email address
   - Check spam folder

## Expected Result

After setup, when you send an invite:
- ✅ Email is sent automatically
- ✅ Recipient receives the email
- ✅ Email contains the invite link
- ✅ No manual copying needed

## Security Notes

- Keep your EmailJS credentials secure
- Don't commit API keys to public repositories
- Consider using environment variables for production

## Next Steps

1. Set up EmailJS account
2. Create email templates
3. Update configuration
4. Test email sending
5. Deploy the updated code

Once completed, your invite system will send real emails automatically! 