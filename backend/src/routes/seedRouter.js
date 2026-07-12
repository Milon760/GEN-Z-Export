const express = require('express');
const { seedUser, seedProduct } = require('../controllers/seedController')

const seddRouter = express.Router();

seddRouter.get('/auth/seed/users', seedUser);
seddRouter.get('/api/seed/products', seedProduct);

module.exports = seddRouter;