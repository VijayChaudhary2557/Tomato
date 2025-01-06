const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/CartController');
const { AuthMiddleware } = require('../middlewares/Auth');

const cartRouter = express.Router();

cartRouter.post("/add", AuthMiddleware, addToCart);
cartRouter.post("/remove", AuthMiddleware, removeFromCart);
cartRouter.post("/get", AuthMiddleware, getCart);

module.exports = cartRouter;