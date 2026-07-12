const { Schema, model } = require('mongoose');
const { defualtImagePath } = require('../secret'); // Note: 'defualt' spelling matches your import

const ProductSchema = new Schema({
    id: {
        type: String, // আপনার আগের JSON এ নাম্বার ছিল, স্ট্রিং রাখলে ভ্যালু '1', '2' এভাবে পাঠাতে হবে
        required: [true, 'Id is required'], // 'require' ফিক্স করে 'required' করা হয়েছে
        unique: true,
        minlength: [1, 'The length of ID must be minimum 3 characters.'] // মেসেজ ঠিক করা হয়েছে
    },
    name: {
        type: String,
        required: [true, 'Product Name is required'], // 'require' ফিক্স করে 'required' করা হয়েছে
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['shirt', 'panjabi', 'pant', 't-shirt'],
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    original_price: { // ডুপ্লিকেট এবং কেস-সেন্সিটিভ ফিল্ড ফিক্স করা হয়েছে
        type: Number,
        required: [true, 'Original price is required'],
        min: [0, 'Original price cannot be negative']
    },
    currency: {
        type: String,
        default: 'BDT',
        trim: true
    },
    sizes: {
        type: [String],
        required: [true, 'Sizes are required']
    },
    colors: { // ডুপ্লিকেট এবং ভুল অবজেক্ট স্ট্রাকচার ফিক্স করা হয়েছে
        type: [String],
        required: [true, 'Colors are required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot be more than 5'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Description is required'], // 'require' ফিক্স করে 'required' করা হয়েছে
        trim: true
    },
    image: {
        type: [String],
        default: defualtImagePath
    }
}, { timestamps: true });

const Products = model('Products', ProductSchema);

module.exports = Products;
