const md5 = require("md5");
const userModel = require("../models/userModel");



module.exports.login = (req, res, next) => {
    res.render('auth/login');
}



module.exports.loginRequest = async (req, res, next) => {
    let errors = [];

    const { email, password } = req.body;
    const hashPassWordMd5 = md5(password);
    // 
    const currentUser = await userModel.findOne({ email: email });

    if (!currentUser) {
        errors.push('field Email is WRONG');
        res.render('auth/login', {
            errors: errors,
            lastValueInput: req.body
        })
    } else {

        // mã hóa PASSWORD = MD5
        if (currentUser.password !== hashPassWordMd5) {
            errors.push('field PassWord is WRONG');
            res.render('auth/login', {
                errors: errors,
                lastValueInput: req.body
            })
        } else {
            res.cookie('userId', currentUser._id);  // ghi vao COOKIE BROWSER: ID của USER
            res.redirect('/');  // về trang HOME
        }

    }
}