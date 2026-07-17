const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../secret');

const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) throw new Error("not authorized! no token");
    try {
        const decoded = await jwt.verify(token, jwtSecretKey);
        req.user = decoded;
        next();
    } catch (error) {
        next(error)
    }
};


module.exports = protect;