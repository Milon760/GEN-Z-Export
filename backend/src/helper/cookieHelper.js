const setAuthCookie = (res, tokenName, token, durationInMinutes = 5) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie(tokenName, token, {
    httpOnly: true, // XSS অ্যাটাক থেকে নিরাপদ রাখে
    secure: isProduction, // Cross-Site কুকির জন্য HTTPS এ true হওয়া বাধ্যতামূলক
    sameSite: isProduction ? "none" : "lax", // 💡 প্রোডাকশনে (Render-এ) অবশ্যই "none" হতে হবে
    maxAge: durationInMinutes * 60 * 1000,
  });
};

const clearAuthCookie = (res, tokenName) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie(tokenName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax", // 💡 clearCookie করার সময় একই অপশন দিতে হয়
  });
};

module.exports = {
  setAuthCookie,
  clearAuthCookie,
};
