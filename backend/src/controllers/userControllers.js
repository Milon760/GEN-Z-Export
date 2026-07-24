const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modle/userModle');
const { successResponse, errorResponse } = require('./responseController');
const { findWithId } = require('../services/findWithId');
const { deleteImage } = require('../helper/deleteImage');
const { jwtSecretKey, } = require('../secret');
const { createJsonWebToken } = require('../helper/jsonwebtoken');
const emailWithNodeMailer = require('../helper/email');
const { activateEmailTemplate, resetEmailTemplate } = require('../helper/emailTemplate');



// numbar 1 register handle (আপনার কোডটি ঠিক আছে, শুধু ডাটা টাইপ নিশ্চিত করা হয়েছে)
const registerHandle = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) throw createError(401, 'All Input required');

    const userExists = await User.exists({ email });

    if (userExists) {
      throw createError(409, 'User with this Email already exist. please login');
    }

    // ৬ ডিজিটের ওটিপি স্ট্রিং
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // create jwt token
    // create jwt token সরাসরি jwt লাইব্রেরি দিয়ে
    const token = jwt.sign(
      { name, email, password, phone, otp },
      jwtSecretKey,
      { expiresIn: '5m' }
    );


    console.log("Generated OTP:", otp);

    const emailData = {
      email,
      subject: "Account Activation Code",
      html: activateEmailTemplate(name, otp),
    };

    // send email with nodemailer
    // try {
    //   await emailWithNodeMailer(emailData);
    // } catch (emailError) {
    //   next(createError(500, 'Failed to send verification email.'));
    //   return;
    // }

    successResponse(res, {
      status: 200,
      message: `Please go to your ${email} for completing your registration process`,
      payload: { token }
    });

  } catch (error) {
    next(error);
  }
};


// numbar 2 user verification 
const verifyOtp = async (req, res, next) => {
  try {
    const { userOtp, token } = req.body;

    if (!userOtp) throw createError(401, 'OTP not found');
    if (!token) throw createError(401, 'Token not found');

    let decoded;
    try {
      decoded = await jwt.verify(token, jwtSecretKey);
    } catch (error) {
      throw createError(400, 'Session time expired. Please register again.');
    }

    const { name, email, password, phone, otp } = decoded;

    console.log("Decoded OTP from Token:", otp);
    console.log("User Input OTP:", userOtp);

    // টাইপ অমিল এড়াতে দুটাকেই স্ট্রিং এবং ট্রিম (Trim) করে তুলনা করা হয়েছে
    if (String(userOtp).trim() !== String(otp).trim()) {
      throw createError(400, 'OTP code does not match, please enter current OTP code.');
    }

    const userExist = await User.findOne({ email });
    if (userExist) throw createError(400, 'User with this email already exists.');

    const newUser = new User({ name, email, password, phone, isVerified: true });
    await newUser.save();

    successResponse(res, {
      status: 201,
      message: 'Registration successful and user verified.',
    });
  } catch (error) {
    next(error);
  }
};


// numbar 3 login handler
const loginHandle = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email or password Requierd!" });
    }

    // ১. ইউজার ডাটাবেজে আছে কিনা চেক করা
    const user = await User.findOne({ email }).select('+password');

    console.log('log user', user);


    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email and pasword " });
    };

    // ২. ইউজার ইমেইল ভেরিফাই করেছে কিনা চেক করা (খুবই গুরুত্বপূর্ণ!)
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "দয়া করে আগে আপনার ইমেইলটি ভেরিফাই করুন!"
      });
    }

    // ৩. পাসওয়ার্ড ম্যাচ করে কিনা চেক করা
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
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
    console.log(error);

    res.status(500).json({ success: false, message: error.message || "সার্ভারে কোনো সমস্যা হয়েছে!" });
  }
};

// numbar 4 get user profile handler
const getUserProfile = async (req, res, next) => {
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


// numbar 5 user profile update 
const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { name, phone, address, } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedUser) throw new Error("User not found");

    successResponse(res, {
      status: 200,
      message: "User Update sucessfull",
      payload: { updatedUser }
    });
  } catch (error) {
    next(error);
  }
};


// numbar 6 update user password
const updateUserPassword = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) throw new Error("password is required");

    const user = await User.findById(userId).select('+password');
    if (!user) throw createError(404, 'user not found');

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) throw createError(400, 'password do not match');

    user.password = newPassword;
    await user.save();

    successResponse(res, {
      status: 200,
      message: 'Password Chanage Successfully',
    });
  } catch (error) {
    next(error)
  }
};


// numbar 7 user logout 
const userLogout = (req, res, next) => {
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


// numbar 8 step 1 reset Password 
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw createError(401, 'email is required')

    const user = await User.findOne({ email });
    if (!user) throw createError(404, 'User not found')

    const otp = Math.floor(100000 + Math.random() * 90000).toString();
    console.log('forgot otp', otp);

    user.resetOtp = otp;
    user.resetExpires = Date.now() + 5 * 60 * 1000; // 5 minites

    await user.save();

    // send email 

    const emailData = {
      email,
      subject: "Password Reset OTP",
      html: resetEmailTemplate(otp),
    };

    // try {
    //   await emailWithNodeMailer(emailData);
    // } catch (emailError) {
    //   next(createError(500, 'Failed to send varification email.'))
    //   return;
    // };

    successResponse(res, {
      status: 200,
      message: "Plase go to your Email send a Verification code.",
    });

  } catch (error) {
    next(error);
  }
};

// numbar 8 step 2 reset Password 
const verifyResetOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw createError(401, 'OTP is required')

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetExpires: { $gt: Date.now() }
    });

    if (!user) throw createError(404, 'otp do not match and otp time is exparire');
    console.log('reset user', user);

    user.resetOtp = undefined;
    user.resetExpires = undefined;
    await user.save();


    // create reset tokrn 
    const resetToken = await jwt.sign(
      { id: user._id, purpose: 'password_reset' },
      jwtSecretKey,
      { expiresIn: '20m' }
    )

    successResponse(res, {
      status: 200,
      message: "OTP Code Verify successfully.",
      payload: { resetToken }
    });

  } catch (error) {
    next(error);
  }
};

// numbar 8 step 3 reset Password 
const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) throw createError(401, 'New Password and Reset token is required')

    const decoded = await jwt.verify(resetToken, jwtSecretKey);
    if (!decoded) throw createError(404, 'Reset time is up')
    if (decoded.purpose !== 'password_reset') throw createError(404, 'Invalid token');

    const user = await User.findById(decoded.id);

    if (!user) throw createError(404, 'User not found')

    user.password = newPassword;
    await user.save();

    successResponse(res, {
      status: 200,
      message: "Password Reset Successfully",
    });

  } catch (error) {
    next(error);
  }
};






// get all user   admin
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

    const skip = (page - 1) * limit;

    // user data fetch 
    const users = await User.find(filter)
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

// get user by id  admin
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


// user update by id admin
const userUpdateWithId = async (req, res, next) => {
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

// user delete by id admin
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




module.exports = {
  getUsers,
  registerHandle,
  loginHandle,
  userFindWithId,
  userUpdateWithId,
  userDeleteWithId,

  forgotPassword,
  verifyResetOtp,
  resetPassword,

  getUserProfile,
  userLogout,
  verifyOtp,
  updateUserProfile,
  updateUserPassword,
}