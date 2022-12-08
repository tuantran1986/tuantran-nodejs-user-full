const express = require('express');
const testCookieRouter = express.Router();

testCookieRouter.get('/set', (req, res, next) => {

    // BE ghi COOKIE BROWSER = RES.COOKIE (không có S)
    res.cookie('key-session-id', 'value-123456');
    res.send('test "SET-COOKIE": F12 xem HEADER: SET-COOKIE');

});


module.exports = testCookieRouter;