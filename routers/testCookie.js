const express = require('express');
const testCookieRouter = express.Router();

testCookieRouter.get('/set', (req, res, next) => {

    // BE ghi COOKIE BROWSER = RES.COOKIE (không có S)
    res.cookie('key-session-id', 'value-123456');
    res.send('test "SET-COOKIE" = "RES.COOKIE": F12 xem HEADER: SET-COOKIE');

});

testCookieRouter.get('/get', (req, res, next) => {

    // BE đọc COOKIE BROWSER = REQ.COOKIES (có S)
    console.log('đọc COOKIES: req.cookies', req.cookies);

    console.log('keys = ', Object.keys(req.cookies));
    console.log('values = ', Object.values(req.cookies));

    const keys = Object.keys(req.cookies);
    const values = Object.values(req.cookies);

    res.send(`test "GET-COOKIE" = "COOKIE-PARSER" + "REQ.COOKIES" : key = ${keys[0]}, value = ${values[0]} `);

});


module.exports = testCookieRouter;