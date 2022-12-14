
// DATA_BASE: 1.require, 2.connect, 3.Schema ,4.model
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/websale2'); // "websale2" = TÊN_DATA_BASE
const userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    email: String,
    password: String
});         // SCHEMA = cấu trúc 1 DOCUMENT

const userModel = mongoose.model('users', userSchema);  // MODEL quản lý COLLECTION = "users", có cấu trúc DOCUMENT = "userSchema"

module.exports = userModel;