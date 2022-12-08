console.log('tuantran - express - running');

const express = require('express');
const app = express();
const PORT = 3000;

// CẤU HÌNH - TEMPLATE ENGINE: "PUG"
app.set('views', './views');
app.set('view engine', 'pug');

// CẤU HÌNH BODY-PARSER:
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CẤU HÌNH - ROUTER:
const userRouter = require('./routers/userRouter');
const testMiddleWareRouter = require('./routers/testMiddleWare');
const testCookieRouter = require('./routers/testCookie');

app.use('/users', userRouter);  // userRouter - PATH GỐC = '/users'
app.use('/testMiddleWare', testMiddleWareRouter);   // userRouter - PATH GỐC = '/users'
app.use('/testCookie', testCookieRouter);           // userRouter - PATH GỐC = '/testCookie'


// CẤU HÌNH - FILE TĨNH = "STATIC"
app.use(express.static('public'));  // đặt trong thư mục "PUBLIC"


// 1. HOME_PAGE
app.get('/', (req, res, next) => {
    // cydb - RES.SEND, RES.RENDER, RES.JSON
    // res.send('<h3>TuanTran - hello world</h3>');

    // "PUG" : truyền tham số vào VIEWS = "OBJECT tham số thứ 2"
        // render - file: INDEX.PUG trong folder "VIEWS"
        // truyền biến - namePage: có giá trị = HomePage - vào VIEW = VIEWS/INDEX.PUG
    res.render('index', { namePage: 'HomePage' });
});



app.listen(PORT, () => {
    console.log(`SERVER EXPRESS is RUNNING in PORT = ${PORT}`);
})