// Real Email Service using Nodemailer Server
// This service will use our Express server with Nodemailer for sending real emails

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://www.lwjazbaa.com/api' 
  : 'http://localhost:3002/api';

// Send invite email using Nodemailer server
export const sendRealInviteEmail = async (email: string, token: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('📧 Sending real invite email to:', email);
    
    const response = await fetch(`${API_BASE_URL}/send-invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        token: token,
        invitedBy: 'admin'
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Real invite email sent successfully:', result);
      return { success: true };
    } else {
      const error = await response.json();
      console.error('❌ Real invite email error:', error);
      return { 
        success: false, 
        error: error.error || error.message || 'Failed to send email' 
      };
    }
    
  } catch (error) {
    console.error('❌ Real invite email error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Network error' 
    };
  }
};

// Send welcome email using Nodemailer server
export const sendRealWelcomeEmail = async (email: string, startupName: string, slug: string): Promise<boolean> => {
  try {
    console.log('📧 Sending real welcome email to:', email);
    
    const response = await fetch(`${API_BASE_URL}/send-welcome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        startupName: startupName,
        slug: slug
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Real welcome email sent successfully:', result);
      return true;
    } else {
      const error = await response.json();
      console.error('❌ Real welcome email error:', error);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Real welcome email error:', error);
    return false;
  }
};

// Test email connection using Nodemailer server
export const testRealEmailConnection = async (): Promise<boolean> => {
  try {
    console.log('🧪 Testing real email connection...');
    
    const response = await fetch(`${API_BASE_URL}/test-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Real email connection test successful:', result);
      return true;
    } else {
      const error = await response.json();
      console.error('❌ Real email connection test failed:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Real email connection test error:', error);
    return false;
  }
};

// Get email configuration status
export const getRealEmailStatus = () => {
  return {
    service: 'Nodemailer Server',
    fromEmail: 'technical@lwindia.com',
    fromName: 'JAZBAA Team',
    status: 'Real Email Service - Server-side Sending',
    configRequired: 'Email credentials configured successfully'
  };
};

// Setup instructions for Nodemailer
export const getEmailJSSetupInstructions = (): string => {
  return `
📧 **Nodemailer Server Setup Instructions:**

1. **Gmail App Password Setup:**
   - Go to your Google Account settings
   - Enable 2-Factor Authentication if not already enabled
   - Go to Security → App passwords
   - Generate an app password for "Mail"
   - Copy the 16-character password

2. **Environment Variables:**
   Create a .env file in your server directory:
   \`\`\`
   GMAIL_APP_PASSWORD=your_16_character_app_password
   \`\`\`

3. **Server Deployment:**
   - Deploy your server to a hosting service (Railway, Render, etc.)
   - Set the GMAIL_APP_PASSWORD environment variable
   - Update the API_BASE_URL in realEmailService.ts

4. **Test the Setup:**
   - Go to /admin/email-test
   - Click "Test Email Connection"
   - Send a test invite from /admin/invite

5. **Production Deployment:**
   - Ensure your server is running and accessible
   - Update API_BASE_URL to your production server URL
   - Test all email functionality

**Benefits of Nodemailer over EmailJS:**
- ✅ Server-side processing (more secure)
- ✅ Better error handling
- ✅ No client-side API keys needed
- ✅ More reliable delivery
- ✅ Custom email templates
- ✅ Better spam score
  `;
}; 