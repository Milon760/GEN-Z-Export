const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modle/userModle');
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findWithId');
const { deleteImage } = require('../helper/deleteImage');
const { jwtSecretKey, clientURL } = require('../secret');
const { createJsonWebToken } = require('../helper/jsonwebtoken');
const emailWithNodeMailer = require('../helper/email');
const { emailTemplate } = require('../helper/emailTemplate');



// get all user
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp('.*' + search + '.*', 'i');

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ]
    };

    const options = { password: 0 };
    const skip = (page - 1) * limit;

    // user data fetch 
    const users = await User.find(filter, options)
      .skip(skip)
      .limit(limit);

    // total user count 
    const totalUser = await User.countDocuments(filter);

    if (!users || users.length === 0) {
      return next(createError(404, 'No users found'));
    }

    const totalPage = Math.ceil(totalUser / limit);

    return successResponse(res, {
      status: 200,
      message: "Users were returned successfully",
      payload: {
        users,
        pagination: {
          totalPage,
          currentPage: page,
          previousPage: page > 1,
          nextPage: page < totalPage,
          totalUser
        },
      }
    });

  } catch (error) {
    next(error);
  }
};

// get user by id
const userFindWithId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 }
    const user = await findWithId(User, id, options)

    successResponse(res, {
      status: 200,
      message: "User was Returned sucessfuuly",
      payload: { user }
    });

  } catch (error) {
    next(error);
  }
};


// register handle
const registerHandle = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.exists({ email: email });

  if (userExists) {
    throw createError(409, 'User with this Email alredy exist. please login')
  }

  // create jwt token
  const token = await createJsonWebToken(
    { name, email, password, phone },
    jwtSecretKey, '10m'
  );


  const emailData = {
    email,
    subject: "Account Activation",
    html: emailTemplate(name, token, clientURL),
  };


  // send email with nodemailer
  // try {
  //   await emailWithNodeMailer(emailData);
  // } catch (emailError) {
  //   next(createError(500, 'Failed to send varification email.'))
  //   return;
  // };

  successResponse(res, {
    status: 200,
    message: `Please go to your ${email} for completing your registetion process`,
    payload: { token }
  });

};


// user verification
const UserVerification = async (req, res) => {

  const token = req.body.token;

  if (!token) throw createError(401, 'token not found');

  const decoded = jwt.verify(token, jwtSecretKey);

  const user = await User.create({
    ...decoded.payload,
    isVerified: true,
  });

  res.status(200).json({
    success: true,
    message: "create user Successfull",
    user
  })

};



// login handler
const loginHandle = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email or password Requierd!" });
    }


    // ১. ইউজার ডাটাবেজে আছে কিনা চেক করা
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "This Email not Register. please Register!" });
    }

    // ২. ইউজার ইমেইল ভেরিফাই করেছে কিনা চেক করা (খুবই গুরুত্বপূর্ণ!)
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "দয়া করে আগে আপনার ইমেইলটি ভেরিফাই করুন!"
      });
    }

    // ৩. পাসওয়ার্ড ম্যাচ করে কিনা চেক করা
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "ভুল ইমেইল অথবা পাসওয়ার্ড!" });
    }

    // ৪. জেডব্লিউটি (JWT) টোকেন তৈরি করা
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtSecretKey,
      { expiresIn: '1d' } // ১ দিনের মেয়াদ
    );

    res.cookie('token', token, {
      httpOnty: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    // ৫. রেসপন্স পাঠানো
    res.status(200).json({
      success: true,
      message: "লগইন সফল হয়েছে",
      user: user,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "সার্ভারে কোনো সমস্যা হয়েছে!" });
  }
};

// get user profile handler
const getUserProfile = async (req, res) => {
  try {
    console.log('iddddd', req.user.userId);
    
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ message: "user id is Requierd!" });
    }


    // ১. ইউজার ডাটাবেজে আছে কিনা চেক করা
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ success: false, message: "user not found" });
    }

    // ৫. রেসপন্স পাঠানো
    res.status(200).json({
      success: true,
      message: "Profile returned successfully",
      user: user,
    });

  } catch (error) {
    next(error);
  }
};




const userUpdateWithId = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, password } = req.body; // বডি থেকে নতুন নাম ও পাসওয়ার্ড নেওয়া

    const updateData = {};
    if (name) updateData.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt)
    }


    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,

      }
    );

    // // ২. আপডেট করার অবজেক্ট তৈরি
    // const updateData = {};
    // if (name) updateData.name = name;
    // if (password) {
    //     // যদি পাসওয়ার্ড হ্যাস করে সেভ করেন, তবে এখানে bcrypt দিয়ে হ্যাস করে নিতে হবে
    //     // const salt = await bcrypt.genSalt(10);
    //     // updateData.password = await bcrypt.hash(password, salt);
    //     updateData.password = password; // বর্তমানে সরাসরি পাসওয়ার্ড দেওয়া হচ্ছে
    // }

    // ৩. ডেটাবেসে আপডেট করা
    // { new: true } দিলে এটি আপডেট হওয়া নতুন ডেটা রিটার্ন করবে
    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { $set: updateData },
    //   { new: true, runValidators: true }
    // );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updateUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


const userDeleteWithId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 }
    const user = await findWithId(User, id, options)

    const userImagePath = user.image;

    if (user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'admin cannot be deleted'
      });
    };

    deleteImage(userImagePath)

    await User.findByIdAndDelete(id);

    successResponse(res, {
      status: 200,
      message: "User were deleted sucessfully",
    });

  } catch (error) {
    next(error);
  }
};

// reset Password 
const PasswordReset = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 }
    const user = await findWithId(User, id, options)

    const userImagePath = user.image;

    if (user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'admin cannot be deleted'
      });
    };

    deleteImage(userImagePath)

    await User.findByIdAndDelete(id);

    successResponse(res, {
      status: 200,
      message: "User were deleted sucessfully",
    });

  } catch (error) {
    next(error);
  }
};


// user logout 
const userLogout = (req, res) => {
  try {
    const cookieClear = res.clearCookie('token');

    if (!cookieClear) throw new Error("cooke clear failed");

    successResponse(res, {
      status: 200,
      message: "Logout sucessfull",
    });
  } catch (error) {
    next(error)
  }
};




module.exports = {
  getUsers,
  registerHandle,
  loginHandle,
  UserVerification,
  userFindWithId,
  userUpdateWithId,
  userDeleteWithId,
  PasswordReset,
  getUserProfile,
  userLogout,
}