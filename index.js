console.log('tuantran - express - running');

const express = require('express');
const app = express();
const PORT = 3000;


// DATA_BASE: 1.require, 2.connect, 3.Schema ,4.model
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/websale2'); // "websale2" = TÊN_DATA_BASE
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});         // SCHEMA = cấu trúc 1 DOCUMENT

const userModel = mongoose.model('users', userSchema);  // MODEL quản lý COLLECTION = "users", có cấu trúc DOCUMENT = "userSchema"



// CẤU HÌNH - TEMPLATE ENGINE: "PUG"
app.set('views', './views');
app.set('view engine', 'pug');

// CẤU HÌNH BODY-PARSER:
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// 1. HOME_PAGE
app.get('/', (req, res, next) => {
    // cydb - RES.SEND, RES.RENDER, RES.JSON
    // res.send('<h3>TuanTran - hello world</h3>');

    // "PUG" : truyền tham số vào VIEWS = "OBJECT tham số thứ 2"
        // render - file: INDEX.PUG trong folder "VIEWS"
        // truyền biến - namePage: có giá trị = HomePage - vào VIEW = VIEWS/INDEX.PUG
    res.render('index', { namePage: 'HomePage' });
});

// 2. LIST USER:
app.get('/users', async (req, res, next) => {

    // "truy vấn dữ liệu" - trong DATABASE = FIND - nhớ: "ASYNC - AWAIT"
    const userList = await userModel.find({});

    res.render('users/index', {
        userList : userList
        // userList: [
        //     { name: 'tuantran', email: 'tuantran.kum@gmail.com' },
        //     { name: 'dieulinh', email: 'dieulinh@gmail.com' },
        //     { name: 'tranan', email: 'tranan@gmail.com' },
        //     { name: 'trantu', email: 'trantu@gmail.com' }
        // ]
    })
})

// 3. SEARCH USER = REGEX NAME + REQUEST QUERY
app.get('/users/search', async (req, res, next) => {
    res.render('users/searchPage', { userList : [] })
})
app.get('/users/searchRequest', async (req, res, next) => {
    // REQ.QUERY : lấy dữ liệu từ URL - toán tử ? &
    // console.log('req.query : ', req.query);
    const keyNameSearch = req.query?.keyNameSearch || '';   // mặc định là '' = all
    const regexName = new RegExp( keyNameSearch, 'i');
    
    // "truy vấn dữ liệu" - trong DATABASE = FIND - nhớ: "ASYNC - AWAIT"
    const userList = await userModel.find({ name: regexName }); // SEARCH = REGEX NAME

    res.render('users/searchPage', {
        userList : userList,
        keyNameSearch : keyNameSearch
    })
})

// 4. CREATE USER:
app.get('/users/create', async (req, res, next) => {
    res.render('users/createPage');
})
// CYDB - METHOD = POST
app.post('/users/createRequest', async (req, res, next) => {
    // REQ.BODY : lấy dữ liệu từ FORM - POST
    console.log('req.body : ', req.body);
    const userNew = req.body;

    // "truy vấn dữ liệu" - trong DATABASE = FIND - nhớ: "ASYNC - AWAIT"
    // CYDB - MONGO DB - THÊM MỚI = "MODEL.CREATE"
    const userList = await userModel.create(userNew); // SEARCH = REGEX NAME

    res.redirect('/users'); // REDIRECT - CHUYỂN TRANG
})


app.listen(PORT, () => {
    console.log(`SERVER EXPRESS is RUNNING in PORT = ${PORT}`);
})