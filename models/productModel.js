
// DATA_BASE: 1.require, 2.connect, 3.Schema ,4.model
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/websale2'); // "websale2" = TÊN_DATA_BASE
const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});         // SCHEMA = cấu trúc 1 DOCUMENT

const productModel = mongoose.model('products', productSchema);  // MODEL quản lý COLLECTION = "users", có cấu trúc DOCUMENT = "productSchema"

module.exports = productModel;