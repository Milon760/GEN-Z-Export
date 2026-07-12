// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

// এটি অটোমেটিক আপনার .env থেকে CLOUDINARY_URL রিড করে নেবে
cloudinary.config();

module.exports = cloudinary;
