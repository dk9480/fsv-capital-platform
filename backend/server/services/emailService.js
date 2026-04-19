const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️ Email credentials not configured. Email sending disabled.');
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email to founder after submission
const sendApplicationReceivedEmail = async (toEmail, startupName) => {
  const transporter = createTransporter();
  if (!transporter) return false;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `FSV Capital: Application Received - ${startupName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #0A1929;">Thank You for Applying to FSV Capital</h2>
        <p>Dear ${startupName} Team,</p>
        <p>We have successfully received your funding application. Our investment team will review your submission within 5-7 business days.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Next Steps:</strong></p>
          <ul>
            <li>Review by investment committee</li>
            <li>If shortlisted, we'll contact you for a pitch session</li>
            <li>Due diligence process for selected startups</li>
          </ul>
        </div>
        <p>You can check your application status by replying to this email.</p>
        <p>Best regards,<br><strong>FSV Capital Investment Team</strong></p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">Fueling DeepTech, Fintech & Future Innovation</p>
      </div>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Email error:', error);
    return false;
  }
};

// Send alert to admin when new application arrives
const sendAdminAlertEmail = async (startupName, industry, dealScore) => {
  const transporter = createTransporter();
  if (!transporter) return false;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Application: ${startupName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>New Startup Application Received</h2>
        <p><strong>Startup:</strong> ${startupName}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Deal Score:</strong> <span style="background: ${dealScore >= 70 ? 'green' : 'orange'}; color: white; padding: 3px 10px; border-radius: 5px;">${dealScore}/100</span></p>
        <p>Login to admin dashboard to review this application.</p>
        <a href="${process.env.FRONTEND_URL}/admin" style="background: #0A1929; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
      </div>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin alert sent for ${startupName}`);
    return true;
  } catch (error) {
    console.error('❌ Admin email error:', error);
    return false;
  }
};

module.exports = { sendApplicationReceivedEmail, sendAdminAlertEmail };
