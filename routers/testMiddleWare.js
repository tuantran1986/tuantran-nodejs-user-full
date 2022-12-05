const express = require('express');
const testMiddleWareRouter = express.Router();


// 
const middleWare1 = (req, res, next) => {
    console.log('middleWare 1 is running, NEXT() để chạy middleWare2');
    res.locals.dataMiddleWare1 = 'data - middleware - 1';
    next();
}
const middleWare2 = (req, res, next) => {
    console.log('middleWare 2 is running, NEXT() để chạy middleWare3');
    res.locals.dataMiddleWare2 = 'data - middleware - 2';
    next();
}
const middleWare3 = (req, res, next) => {
    console.log('middleWare 3 is running, NEXT() để chạy RES.SEND');
    res.locals.dataMiddleWare3 = 'data - middleware - 3';

    next();
}


// 
testMiddleWareRouter.get('/', middleWare1, middleWare2, middleWare3, (req, res, next) => {
    console.log('TRUYEN DATA giua cac MIDDLEWARE = RES.LOCALS :', res.locals);
    res.send('test MiddleWare : xem THỨ TỰ CHẠY MDW - trong CONSOLE LOG - BACKEND');
})


module.exports = testMiddleWareRouter;