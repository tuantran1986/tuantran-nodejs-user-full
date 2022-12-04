const express = require('express');
const userController = require('../controllers/userController');
// const { index } = require('../controllers/userController');
const userRouter = express.Router();

const userModel = require('../models/userModel');

// 1. LIST USER:
userRouter.get('/index', userController.index);

// 2. SEARCH USER = REGEX NAME + REQUEST QUERY
userRouter.get('/search', userController.searchGet);
userRouter.get('/searchRequest', userController.searchRequest);

// 3. CREATE USER:
userRouter.get('/create', userController.createGet);
// CYDB - METHOD = POST
userRouter.post('/createRequest', userController.createPost);

// 4. VIEW DETAILS - USER: khai báo "ID" trong PATH_URL
userRouter.get('/detail/:id', userController.detail)



module.exports = userRouter;