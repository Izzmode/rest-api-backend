const router = require('express').Router();
const orderModel = require('../models/orderModel');
const verifyModel = require('../authentication/auth.js')

//Create
router.post('/', verifyModel.verifyToken, orderModel.createOrder);

//Read users order
router.get('/', verifyModel.verifyToken, orderModel.findOrder);


module.exports = router;