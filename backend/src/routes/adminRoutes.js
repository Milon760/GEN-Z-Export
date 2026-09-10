const express = require("express");

const {
  getUsers,
  userFindWithId,
  addUsers,
  userUpdateWithId,
  userDeleteWithId,

  // products
} = require("../controllers/admin/adminControllers");

const {
  getAllProduct,
  createProducts,
  deleteProducts,

  updateProducts,

  getOrderHistory,
} = require("../controllers/admin/ProductControllers");

const {
  protect,
  isAdmin,
  isLoggedOut,
} = require("../middlewares/authMiddleware");

const upload = require("../middlewares/uploadMiddleware");

const route = express.Router();

// route start /api/admin

// --------------- user router start -----------
// find all user
route.get("/users", protect, isAdmin, getUsers);

// find user with this id
route.get("/users/:id", protect, userFindWithId);

// add user
route.post("/users/add", protect, isAdmin, addUsers);

// update user with this id
route.put("/users/:id", protect, userUpdateWithId);

// delete user wiyh this id
route.delete("/users/:id", protect, userDeleteWithId);

// ----------------- user router close ------------------

///----------------------- products router start ----------------

// get all products
route.get("/products", getAllProduct);

// create product
route.post("/products/create", upload.single("image"), createProducts);

// get all order access only admin
route.get("/products/orders", getOrderHistory);

// update product
route.put("/products/:id", updateProducts);

// delete product
route.delete("/products/:id", deleteProducts);

// ----------------- products router close --------------------

///----------------------- banner router start ----------------

// ----------------- banner router close --------------------

module.exports = route;
