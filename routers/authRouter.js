const express = require('express');
const validateFormLoginMDW = require('../validate/validateFormLoginMDW');
const { login, loginRequest, logout } = require('../controllers/authController');
const authRouter = express.Router();

// 
authRouter.get('/login', login);
authRouter.post('/loginRequest',validateFormLoginMDW, loginRequest);
authRouter.get('/logout', logout);

// 
module.exports = authRouter;