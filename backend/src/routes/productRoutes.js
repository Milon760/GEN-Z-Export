const express = require("express");
const {
  getProducts,

  getProductById,

  addProductToCart,
  orderProducts,

  getMyOrders,

  createSubscribe,
} = require("../controllers/ProductControllers");

const { protect } = require("../middlewares/authMiddleware");

const route = express.Router();

// get all product
route.get("/", getProducts);

//  add to cart handler
route.post("/cart/add", addProductToCart);

// order handler
route.post("/order/place", orderProducts);

// my orders handler
route.get("/my-orders", protect, getMyOrders);

// subscribe
route.post("/subscribe", createSubscribe);

route.get("/:id", getProductById);

module.exports = route;
