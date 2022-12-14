const productModel = require("../../models/productModel");

// 
module.exports.getAllProductControllerAPI = async (req, res, next) => {
    
    const productListJsonAPI = await productModel.find({});

    // API: tra ve JSON = RES.JSON()
    res.json({
        productListJsonAPI: productListJsonAPI || []
    })
}