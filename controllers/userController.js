const router = require('express').Router();
const userModel = require('../models/userModel');

//create new user api/users/create
router.post('/create', userModel.createUser);

router.post('/login', userModel.loginUser);


module.exports = router;
