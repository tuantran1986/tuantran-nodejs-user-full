console.log('tuantran - express - running');

const express = require('express');
const app = express();
const PORT = 3000;

// BAI 19: debugger trong NODEJS = sửa file PACKAGE.JSON : thêm "--inspect"
            // "start": "nodemon --inspect index.js"

// CYDB - "VỊ TRÍ CÁC CẤU HÌNH" : bản chất là các MIDDLE-WARE : có trước có sau.

// CẤU HÌNH - BIẾN MÔI TRƯỜNG: "DOTENV = .ENVIRONMENT" = "CÀNG SỚM CÀNG TỐT"
const dotenv = require('dotenv');
dotenv.config();


// CẤU HÌNH - FILE TĨNH = "STATIC"
app.use(express.static('public'));  // đặt trong thư mục "PUBLIC"



// CẤU HÌNH - "COOKIE"
const cookieParser = require('cookie-parser');
// app.use(cookieParser());  // middle-ware : đọc cookies
// app.use(cookieParser('secretStringLaMotChuoiBatKy'));  // middle-ware : đọc SIGNED_COOKIE : giá trị bị PUBLIC lên GIT
app.use(cookieParser(process.env.SECRET_KEY_SIGNED_COOKIE));  // middle-ware : đọc SIGNED_COOKIE : giá trị đc PRIVATE = PROCESS.ENVIRONMENT



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
const authRouter = require('./routers/authRouter');
const { authRequire } = require('./middleware/authMiddleWare');

// MIDDLEWARE "authRequire" - thực hiện REDIRECT các REQUEST về trang LOGIN (khi USER chưa LOGIN = chưa có: REQ.COOKIES.USERID)
app.use('/users', authRequire, userRouter);  // userRouter - PATH GỐC = '/users'
app.use('/testMiddleWare', authRequire, testMiddleWareRouter);   // userRouter - PATH GỐC = '/users'
app.use('/testCookie', authRequire, testCookieRouter);           // userRouter - PATH GỐC = '/testCookie'
app.use('/auth', authRouter);           // userRouter - PATH GỐC = '/testCookie'



// 1. HOME_PAGE
app.get('/', authRequire, (req, res, next) => {
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