const validateCreateUserMDW = (req, res, next) => {
    // REQ.BODY : lấy dữ liệu từ FORM - POST
    console.log('req.body : ', req.body);

    let errors = [];
    if (req.body && !req.body.name) {
        errors.push('field Name is error');
    }
    if (req.body && !req.body.email) {
        errors.push('field Email is error');
    }
    if (req.body && !req.body.password) {
        errors.push('field Password is error');
    }


    // "res.locals" : để truyền dữ liệu - giữa các middleware
    if (errors && errors.length > 0) {
        res.locals.passValidateCreateUser = false;
        res.locals.errorsValidateCreateUser = [...errors];
    } else {
        res.locals.passValidateCreateUser = true;
    }

    // next() - để chạy sang middleware sau !
    next();
}

module.exports = validateCreateUserMDW;