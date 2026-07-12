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
} = require('../controllers/ProductControllers');
const upload = require('../middlewares/uploadMiddleware');


const route = express.Router();


// create product 
route.post("/products", upload.single('image'), createProducts);

//  add to cart handler
route.post("/products/cart/add", addProductToCart);

// order handler
route.post("/products/order/place", orderProducts)
route.get("/products/order", getOrderHistory)

// get all product
route.get("/products", getProducts)

route.get("/products/:id", getProductById)

// update product
route.put("/products/:id", updateProducts);

// delete product
route.delete("/products/:id", deleteProducts)


module.exports = route;