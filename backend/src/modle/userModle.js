const bcryptjs = require("bcryptjs");
const { Schema, model } = require("mongoose");
const { defaultImagePath } = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "The length of user name can be minimum 3 characters."],
      maxlength: [31, "The length of user name can be maximum 31 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    // OAuth ইউজারদের পাসওয়ার্ড থাকবে না, তাই required সরানো হয়েছে
    password: {
      type: String,
      trim: true,
      minlength: [6, "The length of password can be minimum 6 characters."],
      select: false,
    },
    // OAuth দিয়ে লগইন করলে ফোন নম্বর নাও পেতে পারেন
    phone: {
      type: String, // String রাখা ভালো (যেমন: "+88017...")
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: defaultImagePath,
    },

    // ----------------------------------------------------
    // 🔹 Google & Facebook OAuth এবং সিকিউরিটি ফিল্ডসমূহ
    // ----------------------------------------------------
    googleId: {
      type: String,
      default: null,
    },
    facebookId: {
      type: String,
      default: null,
    },
    // কোন উপায়ে অ্যাকাউন্ট খোলা হয়েছে তা ট্র্যাকিংয়ের জন্য
    authProvider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    // ----------------------------------------------------
    // 🔹 Role & Status (টাইপ ঠিক করা হয়েছে)
    // ----------------------------------------------------
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false, // Google/Facebook দিয়ে সাইন আপ করলে Passport Controller-এ true করে দেবেন
    },

    // ----------------------------------------------------
    // 🔹 ই-কমার্স ট্র্যাকিং ও অ্যানালিটিক্স (Analytics & Stats)
    // ----------------------------------------------------
    totalSpent: {
      type: Number,
      default: 0, // ইউজার মোট কত টাকার কেনাকাটা করেছে
    },
    totalOrders: {
      type: Number,
      default: 0, // মোট সফল অর্ডারের সংখ্যা
    },
    loyaltyPoints: {
      type: Number,
      default: 0, // প্রফেশনাল রিওয়ার্ড/অফার পয়েন্ট
    },

    // ----------------------------------------------------
    // 🔹 নোটিফিকেশন ও ডিসকাউন্ট অফার ট্র্যাকিং
    // ----------------------------------------------------
    notifications: [
      {
        title: String,
        message: String,
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    fcmToken: {
      type: String, // Push Notification (Firebase) পাঠানোর জন্য
      default: null,
    },

    // ----------------------------------------------------
    // 🔹 OTP & Reset password
    // ----------------------------------------------------
    otp: {
      type: String,
      select: false,
    },
    resetOtp: {
      type: String,
      select: false,
    },
    resetExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

// 🔹 Password Hash করার Middleware (যদি পাসওয়ার্ড থাকে তবেই হ্যাশ করবে)
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// 🔹 Password Compare Method
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false; // Google/Facebook ইউজারদের কোনো পাসওয়ার্ড না থাকলে
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;
