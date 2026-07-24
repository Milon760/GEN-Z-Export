const nodemailer = require('nodemailer');
const { brevoHost, brevoPort, brevoUser, brevoPass, brevoSenderEmail } = require('../secret');


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: brevoHost,
  port: brevoPort,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: brevoUser,
    pass: brevoPass,
  },
});


const emailWithNodeMailer = async (emailData) => {
    try {
        const mailOptions = {
            from: brevoSenderEmail,
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