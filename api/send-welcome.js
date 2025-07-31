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
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://www.lwjazbaa.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    res.status(500).json({ 
      message: 'Failed to send welcome email',
      error: error.message 
    });
  }
}; 