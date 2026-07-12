const data = require('../data');
const Products = require('../modle/productModle');
const User = require("../modle/userModle");


const seedUser = async (req, res) => {
    try {
        // deleting all existing users 
        await User.deleteMany({});

        // instering new users 
        const users = await User.insertMany(data.users)
        console.log('user created successfully');

        // successful resoponse 
        return res.status(200).json({
            success: true,
            message: 'user created successfully',
            users,
        });

    } catch (error) {
        console.error(error);

    }
};


const seedProduct = async (req, res) => {
    try {
        // deleting all existing products 
        await Products.deleteMany({});

        // inserting new products
        const products = await Products.insertMany(data.products);
        console.log('Products seeded successfully');

        // successful response 
        return res.status(201).json({ // seeding বা ডাটা ক্রিয়েশনের জন্য 201 স্ট্যাটাস কোড ভালো
            success: true,
            message: 'Products seeded successfully',
            products,
        });

    } catch (error) {
        console.error("Seeding Error:", error);
        return res.status(500).json({
            success: false,
            message: 'Failed to seed products',
            error: error.message
        });
    }
};


module.exports = { seedUser, seedProduct };