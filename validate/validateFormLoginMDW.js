const validateFormLoginMDW = (req, res, next) => {
    // REQ.BODY : lấy dữ liệu từ FORM - POST
    console.log('req.body : ', req.body);

    let errors = [];

    if (req.body && !req.body.email) {
        errors.push('field Email is empty');
    }
    if (req.body && !req.body.password) {
        errors.push('field Password is empty');
    }


    // "res.locals" : để truyền dữ liệu - giữa các middleware
    if (errors && errors.length > 0) {
        res.render('auth/login', {
            errors: errors,
            lastValueInput: req.body
        })
    } else {
        // next() - để chạy sang middleware sau !
        next();
    }
}

module.exports = validateFormLoginMDW;