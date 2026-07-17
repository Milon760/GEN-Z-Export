const express = require('express');
const {
    getProducts,
    createProducts,
    deleteProducts,
    getProductById,
    updateProducts,
    addProductToCart,
    orderProducts,
    getOrderHistory,
    getMyOrders,
} = require('../controllers/ProductControllers');
const upload = require('../middlewares/uploadMiddleware');
const protect = require('../middlewares/authMiddleware');


const route = express.Router();


// create product /api
route.post("/products", upload.single('image'), createProducts);

//  add to cart handler
route.post("/products/cart/add", addProductToCart);

// order handler
route.post("/products/order/place", orderProducts)

// my orders handler
route.get("/products/my-orders", protect, getMyOrders)

// get all order access only admin
route.get("/products/orders", getOrderHistory)

// get all product
route.get("/products", getProducts)

route.get("/products/:id", getProductById)

// update product
route.put("/products/:id", updateProducts);

// delete product
route.delete("/products/:id", deleteProducts)


module.exports = route;