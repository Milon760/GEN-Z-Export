const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const passport = require("passport");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const chatRoute = require("./routes/aiRoutes");
const bannerRoute = require("./routes/bannerRoute");
const adminRoutes = require("./routes/adminRoutes");

const { errorResponse } = require("./controllers/responseController");

require("./config/passport"); // পাসপোর্ট কনফিগ ফাইলটি লোড করলাম

const app = express();

// use Middleware
app.use(morgan("dev"));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize()); // পাসপোর্ট চালু করলাম

// home route
app.get("/", (req, res) => {
  res.send("server is running...");
});

//  Routers
// auth route
app.use("/api/auth", authRouter);

// Products Routers
app.use("/api/products", productRoutes);

// ai chat route
app.use("/api/ai", chatRoute);

// banner slider route
app.use("/api/banner", bannerRoute);

// admin controller route
app.use("/api/admin", adminRoutes);

// cliend errror handling
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// server error handling → all the error
app.use((err, req, res, next) => {
  return errorResponse(res, {
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
