const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const seddRouter = require('./routes/seedRouter');
const { errorResponse } = require('./controllers/responseController');


const app = express();

// use Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// home route 
app.get("/", (req, res) => {
    res.send("server is running...")
});

// User Routers
app.use("/auth", userRoutes);

// Products Routers
app.use("/api", productRoutes);

// seed router 
app.use('/', seddRouter)

// cliend errror handling
app.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

// server error handling → all the error 
app.use((err, req, res, next) => {
    return errorResponse(res, {
        status: err.status,
        message: err.message
    });
});

module.exports = app;