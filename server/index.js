import express from 'express';
import cors from 'cors';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Create transporter for custom email service
const transporter = createTransport({
  service: 'gmail', // Still using Gmail service but with custom credentials
  auth: {
    user: process.env.EMAIL_USER || 'technical@lwindia.com',
    pass: process.env.EMAIL_PASSWORD || 'eohq wlwi dgbd svxk'
  }
});

// Send invite email endpoint
app.post('/api/send-invite', async (req, res) => {
  try {
    const { email, token, invitedBy } = req.body;

    if (!email || !token) {
      return res.status(400).json({ message: 'Email and token are required' });
    }

    const inviteLink = `https://www.lwjazbaa.com/register/${token}`;
    
    const emailSubject = '🎉 You\'re Invited to Join JAZBAA 4.0!';
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #e86888; margin-bottom: 10px;">JAZBAA 4.0</h1>
            <p style="color: #666; font-size: 18px;">The Creator Movement of India</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="margin: 0; text-align: center;">🎉 You're Invited!</h2>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Dear ${email.split('@')[0]},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            You have been invited to join <strong>JAZBAA 4.0</strong> - Where ordinary engineering students become nation-builders in 72 hours!
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e86888;">
            <h3 style="color: #333; margin-bottom: 15px;">🚀 What's JAZBAA 4.0?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>India's largest student entrepreneurship movement</li>
              <li>Connect with mentors and investors</li>
              <li>Build your startup in 72 hours</li>
              <li>Join a community of creators</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${inviteLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; font-size: 16px;">
              🚀 Register Your Startup
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">
            Or copy this link: <a href="${inviteLink}" style="color: #e86888;">${inviteLink}</a>
          </p>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745; margin-top: 25px;">
            <p style="margin: 0; color: #155724; font-size: 14px;">
              <strong>⏰ Limited Time:</strong> This invite link will expire soon. Register now to secure your spot!
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Best regards,<br>The JAZBAA Team<br>technical@lwindia.com
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'technical@lwindia.com',
      to: email,
      subject: emailSubject,
      html: emailBody
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Invite email sent successfully to: ${email}`);
    res.status(200).json({ 
      message: 'Invite email sent successfully',
      inviteLink: inviteLink
    });

  } catch (error) {
    console.error('❌ Error sending invite email:', error);
    res.status(500).json({ message: 'Failed to send invite email' });
  }
});

// Send welcome email endpoint
app.post('/api/send-welcome', async (req, res) => {
  try {
    const { email, startupName, slug } = req.body;

    if (!email || !startupName || !slug) {
      return res.status(400).json({ message: 'Email, startup name, and slug are required' });
    }

    const profileLink = `https://www.lwjazbaa.com/startup/${slug}`;
    
    const emailSubject = `🎉 Welcome to JAZBAA 4.0, ${startupName}!`;
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #e86888; margin-bottom: 10px;">JAZBAA 4.0</h1>
            <p style="color: #666; font-size: 18px;">The Creator Movement of India</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="margin: 0; text-align: center;">🎉 Welcome to the Family!</h2>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Dear ${email.split('@')[0]},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Congratulations! Your startup <strong>"${startupName}"</strong> has been successfully registered on JAZBAA 4.0.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #333; margin-bottom: 15px;">🎯 What's Next?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Complete your startup profile</li>
              <li>Connect with mentors and investors</li>
              <li>Join our community events</li>
              <li>Start building your network</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${profileLink}" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; font-size: 16px;">
              👀 View Your Profile
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">
            Or copy this link: <a href="${profileLink}" style="color: #e86888;">${profileLink}</a>
          </p>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin-top: 25px;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>💡 Pro Tip:</strong> Share your profile link with potential mentors and investors to grow your network!
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Best regards,<br>The JAZBAA Team<br>technical@lwindia.com
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'technical@lwindia.com',
      to: email,
      subject: emailSubject,
      html: emailBody
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Welcome email sent successfully to: ${email}`);
    res.status(200).json({ 
      message: 'Welcome email sent successfully',
      profileLink: profileLink
    });

  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    res.status(500).json({ message: 'Failed to send welcome email' });
  }
});

// Test email connection endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const testEmail = 'test@example.com';
    const testSubject = '🧪 JAZBAA Email Test';
    const testBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e86888;">Email Test Successful!</h2>
        <p>This is a test email to verify that the JAZBAA email system is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p>If you received this email, the email system is properly configured.</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'technical@lwindia.com',
      to: testEmail,
      subject: testSubject,
      html: testBody
    };

    await transporter.sendMail(mailOptions);

    console.log('✅ Email connection test successful');
    res.status(200).json({ message: 'Email connection test successful' });

  } catch (error) {
    console.error('❌ Email connection test failed:', error);
    res.status(500).json({ message: 'Email connection test failed' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, contactType, timestamp } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get contact type info
    const getContactTypeInfo = (type) => {
      switch (type) {
        case 'founders':
          return { title: 'Contact Founders', description: 'Get in touch with our startup founders' };
        case 'call':
          return { title: 'Call Us', description: 'Schedule a call with our team' };
        case 'deck':
          return { title: 'Request Detailed Deck', description: 'Get our comprehensive pitch deck' };
        case 'csr':
          return { title: 'Support via CSR', description: 'Corporate Social Responsibility support' };
        default:
          return { title: 'Contact Us', description: 'Get in touch with our team' };
      }
    };

    const contactInfo = getContactTypeInfo(contactType);

    // Email content
    const emailSubject = `JAZBAA Contact Request: ${contactInfo.title}`;
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e86888; margin-bottom: 20px;">JAZBAA Contact Request</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 15px;">${contactInfo.title}</h3>
          <p style="color: #666; margin-bottom: 10px;">${contactInfo.description}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h4 style="color: #333; margin-bottom: 10px;">Contact Details:</h4>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h4 style="color: #333; margin-bottom: 10px;">Message:</h4>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e86888;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
          <p style="margin: 0; color: #155724;">
            <strong>Action Required:</strong> Please respond to this contact request within 24-48 hours.
          </p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated message from the JAZBAA platform.
        </p>
      </div>
    `;

    // Send email to admin (technical@lwindia.com)
    const mailOptions = {
      from: process.env.EMAIL_USER || 'technical@lwindia.com',
      to: 'technical@lwindia.com', // Always send to your email
      subject: emailSubject,
      html: emailBody,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to the contact
    const confirmationSubject = 'JAZBAA Contact Request Received';
    const confirmationBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e86888; margin-bottom: 20px;">Thank You for Contacting JAZBAA</h2>
        
        <p>Dear ${name},</p>
        
        <p>We have received your contact request regarding <strong>${contactInfo.title}</strong>.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #333; margin-bottom: 10px;">Your Message:</h4>
          <p style="background-color: white; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
          <p style="margin: 0; color: #856404;">
            <strong>Our team will get back to you within 24-48 hours.</strong>
          </p>
        </div>
        
        <p style="margin-top: 20px;">Best regards,<br>The JAZBAA Team</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated confirmation email.
        </p>
      </div>
    `;

    const confirmationMailOptions = {
      from: process.env.EMAIL_USER || 'technical@lwindia.com',
      to: email,
      subject: confirmationSubject,
      html: confirmationBody
    };

    await transporter.sendMail(confirmationMailOptions);

    res.status(200).json({ message: 'Contact request submitted successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to submit contact request' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 