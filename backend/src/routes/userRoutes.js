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
} = require('../controllers/userControllers')


const route = express.Router();


// route create /auth
route.post('/register', registerHandle);

// verify user
route.post('/verify', UserVerification);

// login router
route.post('/login', loginHandle);

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