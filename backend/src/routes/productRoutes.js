const express = require("express");
const {
  getProducts,

  getProductById,

  addProductToCart,
  orderProducts,

  getMyOrders,
} = require("../controllers/ProductControllers");

const { protect } = require("../middlewares/authMiddleware");

const route = express.Router();

// get all product
route.get("/", getProducts);

route.get("/products/:id", getProductById);

//  add to cart handler
route.post("/products/cart/add", addProductToCart);

// order handler
route.post("/products/order/place", orderProducts);

// my orders handler
route.get("/products/my-orders", protect, getMyOrders);

module.exports = route;
