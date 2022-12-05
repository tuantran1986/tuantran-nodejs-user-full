const express = require('express');
const testMiddleWareRouter = express.Router();


// 
const middleWare1 = (req, res, next) => {
    console.log('middleWare 1 is running, NEXT() để chạy middleWare2');
    next();
}
const middleWare2 = (req, res, next) => {
    console.log('middleWare 2 is running, NEXT() để chạy middleWare3');
    next();
}
const middleWare3 = (req, res, next) => {
    console.log('middleWare 3 is running, NEXT() để chạy RES.SEND');
    next();
}


// 
testMiddleWareRouter.get('/', middleWare1, middleWare2, middleWare3, (req, res, next) => {
    res.send('test MiddleWare : xem THỨ TỰ CHẠY MDW - trong CONSOLE LOG - BACKEND');
})


module.exports = testMiddleWareRouter;