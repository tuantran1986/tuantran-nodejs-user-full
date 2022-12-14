const express = require('express');
const multer = require('multer');

const userController = require('../controllers/userController');
// const { index } = require('../controllers/userController');
const userRouter = express.Router();

const userModel = require('../models/userModel');
const validateCreateUserMDW = require('../validate/validateCreateUserMDW');

// 5. CẤU HÌNH - MULTER: UPLOAD_FILE: thư mục chứa file - upload lên (dest: 'public/uploads/')
const upload = multer({ dest: 'public/uploads/' });

// 1. LIST USER:
userRouter.get('/index', userController.index);

// 2. SEARCH USER = REGEX NAME + REQUEST QUERY
userRouter.get('/search', userController.searchGet);
userRouter.get('/searchRequest', userController.searchRequest);

// 3. CREATE USER:
userRouter.get('/create', userController.createGet);
// CYDB - METHOD = POST: validate create user = MIDDLEWARE "validateCreateUserMDW"
    // thêm MIDDLEWARE : UPLOAD AVATAR - IMG = 
    // thêm upload.single('avatarUser')
    // ('avatarUser') : tên biến - AVATAR của thẻ INPUT
userRouter.post('/createRequest', 
    upload.single('avatarUser'), 
    validateCreateUserMDW, 
    userController.createPost
);

// 4. VIEW DETAILS - USER: khai báo "ID" trong PATH_URL
userRouter.get('/detail/:id', userController.detail)



module.exports = userRouter;