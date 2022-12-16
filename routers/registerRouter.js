const express = require('express');
const multer = require('multer');

const userController = require('../controllers/userController');
// const { index } = require('../controllers/userController');
const registerRouter = express.Router();

const userModel = require('../models/userModel');
const validateCreateUserMDW = require('../validate/validateCreateUserMDW');

// 5. CẤU HÌNH - MULTER: UPLOAD_FILE: thư mục chứa file - upload lên (dest: 'public/uploads/')
const upload = multer({ dest: 'public/uploads/' });


// 3. CREATE USER:
registerRouter.get('/createForm', userController.registerForm);
// CYDB - METHOD = POST: validate create user = MIDDLEWARE "validateCreateUserMDW"
    // thêm MIDDLEWARE : UPLOAD AVATAR - IMG = 
    // thêm upload.single('avatarUser')
    // ('avatarUser') : tên biến - AVATAR của thẻ INPUT
registerRouter.post('/createRequest', 
    upload.single('avatarUser'), 
    validateCreateUserMDW, 
    userController.registerRequest
);


module.exports = registerRouter;