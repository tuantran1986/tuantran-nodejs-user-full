const md5 = require("md5");
const userModel = require("../models/userModel");


// 1. LIST USER:
module.exports.index = async (req, res, next) => {

    // "truy vấn dữ liệu" - trong DATABASE = FIND - nhớ: "ASYNC - AWAIT"
    const userList = await userModel.find({});
    console.log('=========tuantran : ', userList)
    res.render('users/index', {
        userList : userList
        // userList: [
        //     { name: 'tuantran', email: 'tuantran.kum@gmail.com' },
        //     { name: 'dieulinh', email: 'dieulinh@gmail.com' },
        //     { name: 'tranan', email: 'tranan@gmail.com' },
        //     { name: 'trantu', email: 'trantu@gmail.com' }
        // ]
    })
};

// 2. SEARCH USER = REGEX NAME + REQUEST QUERY
module.exports.searchGet = async (req, res, next) => {
    res.render('users/searchPage', { userList : [] })
};
module.exports.searchRequest = async (req, res, next) => {
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
};

// 3. CREATE USER:
module.exports.createGet = async (req, res, next) => {
    res.render('users/createPage');
};
module.exports.createPost = async (req, res, next) => {
    // REQ.BODY : lấy dữ liệu từ FORM - POST
    // VALIDATE - CREATE USER = MIDDLEWARE "validateCreateUserMDW"
    if (!res.locals.passValidateCreateUser) {
        res.render('users/createPage', {
            errors: res.locals.errorsValidateCreateUser,
            lastDataInput: req.body
        })
    } else {
        const { name, email, password } = req.body;
        // mã hóa PASSWORD = MD5
        const hashPassWordMd5 = md5(password);  // "123456"  =>  "e10adc3949ba59abbe56e057f20f883e" 
        const userNew = {
            name: name, 
            email: email, 
            password: hashPassWordMd5
        };

        // "truy vấn dữ liệu" - trong DATABASE = FIND - nhớ: "ASYNC - AWAIT"
        // CYDB - MONGO DB - THÊM MỚI = "MODEL.CREATE"
        const userList = await userModel.create(userNew); // SEARCH = REGEX NAME
        res.redirect('index'); // REDIRECT - CHUYỂN TRANG
    }
};

// 4. VIEW DETAILS - USER: khai báo "ID" trong PATH_URL
module.exports.detail = async (req, res, next) => {
    console.log('req.params', req.params);
    const idDetail = req.params?.id || '';  // lấy value_ID trên URL
    
    // truy vấn:
        // MODEL.FIND : trả về "mảng"
            // const userDetail = await userModel.find({ _id: idDetail })[0];
        // MODEL.FINDONE : trả về "1 PHẦN TỬ"
            const userDetail = await userModel.findOne({ _id: idDetail });

    res.render('users/detail', { user: userDetail });
};
