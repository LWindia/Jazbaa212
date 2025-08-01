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
    res.status(500).json({ 
      message: 'Failed to send invite email',
      error: error.message 
    });
  }
}; 