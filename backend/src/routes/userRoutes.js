const express = require('express');

const {
    getUsers,
    registerHandle,
    loginHandle,
    UserVerification,
    userFindWithId,
    userDeleteWithId,
    userUpdateWithId,
    PasswordReset,
    getUserProfile,
    userLogout,
} = require('../controllers/userControllers');
const protect = require('../middlewares/authMiddleware');


const route = express.Router();


// route create /auth
route.post('/register', registerHandle);

// verify user
route.post('/verify', UserVerification);

// login router
route.post('/login', loginHandle);

// user profine access 
route.get('/profile', protect, getUserProfile);

// user logout handler
route.post('/logout', userLogout);

// Reset password
route.post('forgot-password', PasswordReset);

// user fine router
route.get("/users", getUsers);

route.get("/users/:id", userFindWithId);

// update user
route.put("users/:id", userUpdateWithId);

// delete user
route.delete("users/:id", userDeleteWithId);



module.exports = route;