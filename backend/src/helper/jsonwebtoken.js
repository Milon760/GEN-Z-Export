const jwt = require("jsonwebtoken");

const createJsonWebToken = (payload = {}, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be a non-empty object");
  }
  if (typeof secretKey !== "string" || secretKey === "") {
    throw new Error("Secret key must be a non-empty string");
  }
  try {
    const token = jwt.sign({ payload }, secretKey, { expiresIn: expiresIn });
    return token;
  } catch (error) {
    console.error("Failed to sign the JWT:", error);
    throw error;
  }
};

const verifyJsonWebToken = (token, secretKey) => {
  if (typeof token !== "string" || token === "") {
    throw new Error("Token must be a non-empty string");
  }
  if (typeof secretKey !== "string" || secretKey === "") {
    throw new Error("Secret key must be a non-empty string");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Failed to verify the JWT:", error.message);
    throw error; // এররটি থ্রো করা হলো যাতে মিডলওয়্যার বা কন্ট্রোলার এটি ক্যাচ (catch) করতে পারে
  }
};

module.exports = {
  createJsonWebToken,
  verifyJsonWebToken,
};
