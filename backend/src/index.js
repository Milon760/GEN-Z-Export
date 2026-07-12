
const app = require('./app');
const connectDB = require('./config/db');
const { serverPort } = require('./secret');


app.listen(serverPort, async () => {
    console.log(`server is running at https//localhost:${serverPort}`);
    try {
        await connectDB();
    } catch (error) {
        console.error('Database Connection Failed', error.message);
    }
});




// const express = require('express');
// const mongoose = require('mongoose');

// const connectDB = require('./config/db');
// const { serverPort } = require('./secret');

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // --- SCHEMA & MODEL ---
// const ProductsSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, 'Title is Required']
//     },
//     price: {
//         type: Number,
//         required: [true, 'Price is Required']
//     },
//     description: {
//         type: String,
//         required: [true, 'Description is Required']
//     },
// });

// const Products = mongoose.model('Products', ProductsSchema);

// // --- ROUTES ---
// app.get('/', (req, res) => {
//     res.status(200).send('Welcome to my Home page');
// });

// // Get All Products
// app.get('/products', async (req, res, next) => {
//     try {
//         const products = await Products.find();
        
//         if (!products || products.length === 0) {
//             const error = new Error('Products not Found');
//             error.status = 404;
//             return next(error);
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Products returned successfully',
//             products
//         });
//     } catch (error) {
//         next(error); // সরাসরি গ্লোবাল এরর হ্যান্ডলারে চলে যাবে
//     }
// });

// // Create Product
// app.post('/products', async (req, res, next) => {
//     try {
//         const { title, price, description } = req.body || {};
        
//         if (!title || !price || !description) {
//             const error = new Error('Title, Price, and Description are required');
//             error.status = 400; // Bad Request
//             return next(error);
//         }

//         const newProduct = new Products({ title, price, description });
//         const product = await newProduct.save();

//         res.status(201).json({
//             success: true,
//             message: 'Product created successfully',
//             product
//         });
//     } catch (error) {
//         next(error); // Mongoose Validation Error ও এখানে হ্যান্ডেল হবে
//     }
// });

// // --- ERROR HANDLING MIDDLEWARES ---

// // ৪MD৪ রাউট হ্যান্ডলার (যদি কোনো রাউট ম্যাচ না করে)
// app.use((req, res, next) => {
//     const error = new Error('Route not Found');
//     error.status = 404;
//     next(error); // এররটি গ্লোবাল হ্যান্ডলারে পাঠিয়ে দেওয়া হলো
// });

// // সেন্ট্রাল/গ্লোবাল এরর হ্যান্ডলার (সবার নিচে থাকবে)
// app.use((err, req, res, next) => {
//     const statusCode = err.status || 500;
    
//     res.status(statusCode).json({
//         success: false,
//         message: err.message || 'Internal Server Error',
//         // ডেভেলপমেন্ট মোডে থাকলে এররটি বিস্তারিত দেখার জন্য (ঐচ্ছিক)
//         stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
//     });
// });

// // --- SERVER START ---
// app.listen(serverPort, async () => {
//     console.log(`Server is running at http://localhost:${serverPort}`);
//     try {
//         await connectDB();
//     } catch (dbError) {
//         console.error('Database connection failed:', dbError.message);
//     }
// });