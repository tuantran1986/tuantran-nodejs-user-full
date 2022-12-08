const userModel = require("../models/userModel");


// 
module.exports.authRequire = async (req, res, next) => {
    console.log('doc COOKIE = REQ.COOKIES', req.cookies);

    if (!req.cookies.userId) {
        res.redirect('/auth/login');
    }

    // so sanh: USERID trong "COOKIE REQ HEADER" - với - "DATABASE"
    const currentUser = await userModel.findOne({ _id: req.cookies.userId });
    if (!currentUser) {
        res.redirect('/auth/login');
        return;
    }
    console.log('currentUser: ', currentUser);
    res.locals.currentUserLocal = currentUser;  // lưu LOCAL - để hiển thị trên VIEW - MENU
    next();
}