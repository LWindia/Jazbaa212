const nodemailer = require('nodemailer');

// Create transporter for custom email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'technical@lwindia.com',
    pass: process.env.EMAIL_PASSWORD || 'eohq wlwi dgbd svxk'
  }
});

module.exports = async (req, res) => {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    res.status(500).json({ 
      message: 'Email connection test failed',
      error: error.message 
    });
  }
}; 