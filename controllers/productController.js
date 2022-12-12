const productModel = require("../models/productModel");


// 1. LIST USER:
module.exports.getAllProduct = async (req, res, next) => {

    // "truy vấn dữ liệu" - trong DATABASE = FIND - nhớ: "ASYNC - AWAIT"
    const productList = await productModel.find({});
    console.log('========= productList : ', productList);

    res.render('products/index', {
        productList : productList
    })
};
