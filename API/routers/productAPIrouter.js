const express = require('express');

const productAPIcontroller = require('../../API/controllers/productAPIcontroller');
const productRouterAPI = express.Router();

productRouterAPI.get('/allJson', productAPIcontroller.getAllProductControllerAPI);

module.exports = productRouterAPI;