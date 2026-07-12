const nodemailer = require('nodemailer');
const { smtpUserName, smtpUserPassword } = require('../secret');


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: smtpUserName,
    pass: smtpUserPassword,
  },
});


const emailWithNodeMailer = async (emailData) => {
    try {
        const mailOptions = {
            from: smtpUserName,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.html
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error occured while senting email: ', error);
        throw error;
    }
};


module.exports = emailWithNodeMailer;