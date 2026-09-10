const createError = require("http-errors");
const { successResponse } = require("../responseController");
// const { findWithId } = require("../services/findWithId");
// const { deleteImage } = require("../helper/deleteImage");
const Products = require("../../modle/productModle");
const Cart = require("../../modle/cart");
const Order = require("../../modle/order");
const cloudinary = require("../../config/cloudinary");

// get all product
const getAllProduct = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [
        { name: { $regex: searchRegExp } },
        { category: { $regex: searchRegExp } },
      ],
    };

    let productQuery = Products.find(filter).sort({ createAt: -1 });

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 0;
    let totalPage = 1;

    if (req.query.limit) {
      const skip = (page - 1) * limit;

      productQuery.skip(skip).limit(limit);
    }

    const products = await productQuery;

    // total product count
    const totalProduct = await Products.countDocuments(filter);

    if (!products || products.length === 0) {
      throw createError(404, "No products found matching your search");
    }

    if (limit > 0) {
      totalPage = Math.ceil(totalProduct / limit);
    }

    successResponse(res, {
      status: 200,
      message: "Products were returned successfully",
      payload: {
        products,
        pagination: {
          totalPage: totalPage,
          currentPage: page,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: page < totalPage ? page + 1 : null,
          totalProduct: totalProduct,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// get Product by id
const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Products.findById(id);

    if (!product) throw createError(404, "Product not found");

    successResponse(res, {
      status: 200,
      message: "Product were Returned sucessfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

// Create a Product
const createProducts = async (req, res, next) => {
  try {
    const {
      id,
      name,
      category,
      price,
      original_price,
      size,
      colors,
      stock,
      rating,
      description,
      // req.body থেকে image রিসিভ করার দরকার নেই, কারণ এটি req.file থেকে আসবে
    } = req.body || {};

    console.log(
      "products data",
      id,
      name,
      category,
      price,
      original_price,
      size,
      colors,
      stock,
      rating,
      description,
      req.file, // এখানে req.file চেক করুন
    );

    // ১. সব ডাটা ঠিকঠাক আছে কিনা যাচাই (৪০০ ব্যাড রিকোয়েস্ট)
    if (
      !id ||
      !name ||
      !category ||
      !price ||
      !original_price ||
      !size ||
      !colors ||
      !stock ||
      !rating ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and cannot be empty.",
      });
    }

    // ২. ইমেজ ফাইল পাঠানো হয়েছে কিনা যাচাই করা
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Product image is required." });
    }

    // ৩. ক্লাউডিনারিতে ইমেজ আপলোড
    const fileBase64 = req.file.buffer.toString("base64");
    const fileUrl = `data:${req.file.mimetype};base64,${fileBase64}`;
    const uploadResponse = await cloudinary.uploader.upload(fileUrl, {
      folder: "products",
    });
    const image_url = uploadResponse.secure_url; // এটি হলো ক্লাউডিনারির পার্মানেন্ট ইমেজ লিংক

    // ৪. নতুন প্রোডাক্ট তৈরি ও সেভ করা (এখানে image_url দিতে হবে)
    const newProduct = new Products({
      id,
      name,
      category,
      price,
      original_price,
      size,
      colors,
      stock,
      rating,
      description,
      image: image_url, // 👈 ঠিক এই জায়গাটি পরিবর্তন করা হয়েছে
    });
    const product = await newProduct.save();

    // ৫. সেভ না হলে ৫০০ ইন্টারনাল সার্ভার এরর
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product creation failed due to a database error.",
      });
    }

    // ৬. সফল রেসপন্স
    return successResponse(res, {
      status: 201,
      message: "Product created successfully",
      payload: { product },
    });
  } catch (error) {
    // যেকোনো আনএক্সপেক্টেড এরর কনসোলে দেখার জন্য
    console.error("Error in createProducts:", error);

    // আসল এরর মেসেজটি ক্লায়েন্টকে পাঠানো হচ্ছে
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "failed to create products",
    });
  }
};

// Delete a Product with id
const deleteProducts = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw createError(404, "No-empty value not accepted");
    }

    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      throw createError(401, "Product not fount ");
    }

    successResponse(res, {
      status: 201,
      message: "Products deleted sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// update product by id
const updateProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (!id) {
      throw createError(404, "No-empty value not accepted");
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      throw createError(401, "Product not fount ");
    }

    successResponse(res, {
      status: 201,
      message: "Products updated sucessfully",
      payload: { updatedProduct },
    });
  } catch (error) {
    next(error);
  }
};

// get all order admin
const getOrderHistory = async (req, res, next) => {
  try {
    const orderHistory = await Order.find();

    if (!orderHistory || orderHistory.length === 0) {
      throw createError(400, "Order Histroy not found ");
    }

    successResponse(res, {
      status: 200,
      message: "Order History reatruned sucessfully",
      payload: { orderHistory },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProduct,
  createProducts,
  deleteProducts,
  getProductById,
  updateProducts,
  getOrderHistory,
};
