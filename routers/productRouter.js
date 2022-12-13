const express = require('express');
const productController = require('../controllers/productController');
// const { index } = require('../controllers/userController');
const productRouter = express.Router();

const productModel = require('../models/productModel');
const validateCreateUserMDW = require('../validate/validateCreateUserMDW');

// 1. LIST USER:
productRouter.get('/all', productController.getAllProduct);
productRouter.get('/pagination', productController.paginationProduct);
productRouter.get('/paginationSearch', productController.paginationSearchProduct);




module.exports = productRouter;