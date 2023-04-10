const router = require('express').Router();
const productModel = require('../models/productModel');

//Create
router.post('/', productModel.createProduct);

//Read
router.get('/', productModel.getAllProducts);
router.get('/:id', productModel.getProductById);

//Update
router.put('/:id', productModel.updateProduct);

//Delete
router.delete('/:id', productModel.deleteProduct);

//TBD middleware verify 2.37 lektion 8 

module.exports = router;