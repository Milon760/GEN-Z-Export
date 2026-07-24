const express = require('express');

const {
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
} = require('../controllers/userControllers');
const protect = require('../middlewares/authMiddleware');


const route = express.Router();


// numbar 1  route create /auth
route.post('/register', registerHandle);

// numbar 2 verify user
route.post('/verify', verifyOtp);

// numbar 3 login router
route.post('/login', loginHandle);

// numbar 4 user profine access 
route.get('/profile', protect, getUserProfile);

// numbar 5 update user profile 
route.put('/profile', protect, updateUserProfile);

// numbar 6 update password
route.put('/update-password', protect, updateUserPassword);

// numbar 7 user logout handler
route.post('/logout', userLogout);

// numbar 8 step 1 Reset password
route.post('/forgot-password', forgotPassword);
// step 2
route.post('/verify-otp', verifyResetOtp);
// step 3
route.put('/reset-password', resetPassword);

// user fine router
route.get("/users", getUsers);

route.get("/users/:id", userFindWithId);

// update user
route.put("users/:id", userUpdateWithId);

// delete user
route.delete("users/:id", userDeleteWithId);



module.exports = route;