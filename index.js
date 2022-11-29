console.log('tuantran - express - running');

const express = require('express');
const app = express();
const PORT = 3000;

// CẤU HÌNH - TEMPLATE ENGINE: "PUG"
app.set('views', './views');
app.set('view engine', 'pug');


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
app.get('/users', (req, res, next) => {
    res.render('users/index', {
        userList: [
            { name: 'tuantran', email: 'tuantran.kum@gmail.com' },
            { name: 'dieulinh', email: 'dieulinh@gmail.com' },
            { name: 'tranan', email: 'tranan@gmail.com' },
            { name: 'trantu', email: 'trantu@gmail.com' }
        ]
    })
})


app.listen(PORT, () => {
    console.log(`SERVER EXPRESS is RUNNING in PORT = ${PORT}`);
})