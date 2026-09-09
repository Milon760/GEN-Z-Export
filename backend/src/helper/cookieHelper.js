const setAuthCookie = (res, tokenName, token, durationInMinutes = 5) => {
  res.cookie(tokenName, token, {
    httpOnly: true, // ক্লায়েন্ট সাইড স্ক্রিপ্ট (XSS attack) থেকে নিরাপদ রাখবে
    secure: process.env.NODE_ENV === "production", // প্রোডাকশনে শুধুমাত্র HTTPS-এ কাজ করবে
    sameSite: "lax", // CSRF অ্যাটাক থেকে সুরক্ষা দেবে
    maxAge: durationInMinutes * 60 * 1000, // মিনিটকে মিলিসেকেন্ডে কনভার্ট করা হয়েছে
  });
};

const clearAuthCookie = (res, tokenName) => {
  res.clearCookie(tokenName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

module.exports = {
  setAuthCookie,
  clearAuthCookie,
};
