const express = require("express");
const passport = require("passport");

const {
  registerHandle,
  verifyOtp,
  loginHandle,
  userLogout,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  handleOAuthCallback,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// start route /api/auth

// 1. user register
router.post("/register", registerHandle);

// 2. verify user
router.post("/verify", verifyOtp);

// 3. login user
router.post("/login", loginHandle);

// 4. user logout handler
router.post("/logout", protect, userLogout);

// 5. user profine access
router.get("/profile", protect, getUserProfile);

// 6. update user profile
router.put("/profile", protect, updateUserProfile);

// 7. update password
router.put("/update-password", protect, updateUserPassword);

// 8. forget password user password step : 1
router.post("/forgot-password", forgotPassword);

// forget password user password step : 2
router.post("/verify-otp", verifyResetOtp);

// forget password user password : step 3
router.put("/reset-password", resetPassword);

// google auth
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login?error=oauth_failed",
  }),
  handleOAuthCallback, // 👈 Controller logic call
);

// facebook auth
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["public_profile"] }),
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "http://localhost:5173/login?error=oauth_failed",
  }),
  handleOAuthCallback, // 👈 Controller logic call
);

module.exports = router;
