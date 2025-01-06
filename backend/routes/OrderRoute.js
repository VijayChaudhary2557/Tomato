const express = require('express');
const { AuthMiddleware } = require('../middlewares/Auth');
const { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } = require('../controllers/OrderController');

const orderRoute = express.Router();

orderRoute.post('/place', AuthMiddleware, placeOrder);

orderRoute.post("/verify", verifyOrder);

orderRoute.post("/userorders", AuthMiddleware, userOrders);

orderRoute.get("/list", listOrders);

orderRoute.post("/status", updateStatus);


module.exports = orderRoute;