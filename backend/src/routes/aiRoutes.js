const express = require("express");
const router = express.Router();
const {
  generateAdminProductProfile,
  streamCustomerChat,
} = require("../controllers/aiControllers");

// Feature 1
router.post("/admin/generate-product", generateAdminProductProfile);

// Feature 2 & 3 (Streaming Chatbot)
router.post("/customer/chat-stream", streamCustomerChat);

module.exports = router;
