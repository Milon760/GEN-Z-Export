require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL = process.env.MONGO_URL || 'mongodb://localhost:27017/GEN-Z';
const jwtSecretKey = process.env.JWT_SECRETKEY || 'mdjkdkiie8^77$gbcb';
const smtpUserName = process.env.SMTP_USER_NAME || '';
const smtpUserPassword = process.env.SMTP_USER_PASSWORD || '';
const defualtImagePath = process.env.DEFUALT_IMAGE_PATH || 'public/images/userImage/defualt.jpg';
const clientURL = process.env.CLIENT_SITE_URL || 'http://localhost:5173';
const cloudinaryUserName = process.env.CLOUDINARY_USER_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
const brevoSenderName = process.env.BREVO_SENDER_NAME;
const brevoHost = process.env.SMTP_HOST;
const brevoPort = process.env.SMTP_PORT;
const brevoUser = process.env.SMTP_USER;
const brevoPass = process.env.SMTP_PASS;


module.exports = {
    serverPort,
    mongodbURL,
    jwtSecretKey,
    smtpUserName,
    smtpUserPassword,
    defualtImagePath,
    clientURL,
    cloudinaryUserName,
    cloudinaryApiKey,
    cloudinaryApiSecret,

    brevoSenderEmail,
    brevoSenderName,
    brevoHost,
    brevoPort,
    brevoUser,
    brevoPass
};