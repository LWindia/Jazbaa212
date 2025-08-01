const nodemailer = require('nodemailer');

// Create transporter for Gmail
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'technical@lwindia.com',
    pass: process.env.EMAIL_PASSWORD || 'eohq wlwi dgbd svxk'
  }
});

module.exports = async (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test email configuration
    await transporter.verify();
    
    // Send a test email
    const testEmail = {
      from: process.env.EMAIL_USER || 'technical@lwindia.com',
      to: 'technical@lwindia.com',
      subject: 'JAZBAA Contact Form - API Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e86888;">🚀 JAZBAA API Test Successful!</h2>
          <p>This is a test email to verify that the contact form API is working properly on production.</p>
          <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 5px; padding: 15px; margin: 20px 0;">
            <strong>✅ Email system is functioning correctly!</strong>
          </div>
          <p>Date: ${new Date().toLocaleString()}</p>
          <p>Environment: ${process.env.NODE_ENV || 'production'}</p>
        </div>
      `
    };

    await transporter.sendMail(testEmail);

    res.status(200).json({ 
      message: 'Test email sent successfully!',
      emailService: 'Gmail',
      recipient: 'technical@lwindia.com',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({ 
      message: 'Email test failed',
      error: error.message,
      code: error.code
    });
  }
};