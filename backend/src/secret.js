require("dotenv").config();

const serverPort = process.env.SERVER_PORT;

const mongodbURL = process.env.MONGO_URL;

const clientURL = process.env.CLIENT_SITE_URL;

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_KEY;

const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
const brevoApiKey = process.env.BREVO_API_KEY;

const nodeEnv = process.env.NODE_ENV;

const cloudinaryUrl = process.env.CLOUDINARY_URL;

const googleClientId = process.env.GOOGLE_CLIENT_SECRET;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const facebookAppId = process.env.FACEBOOK_APP_ID;
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;

const geminiApiKey = process.env.GEMINI_API_KEY;

module.exports = {
  serverPort,
  mongodbURL,
  clientURL,
  jwtSecretKey,
  jwtRefreshSecretKey,

  brevoSenderEmail,
  brevoApiKey,

  nodeEnv,

  cloudinaryUrl,

  googleClientId,
  googleClientSecret,

  facebookAppId,
  facebookAppSecret,
  //
  geminiApiKey,
};
