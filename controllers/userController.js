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

    console.log('=== req: ', req);
    console.log('=== req.file: ', req.file);
    // console.log('=== avatarPath: ', avatarPath);
    // const avatarPath = '/';
    const avatarPath = '/' + req.file.path.split('\\').slice(1).join('/');

    console.log('avatarPath', avatarPath)

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
            avatar: avatarPath,             // thêm AVATAR IMAGE = chuỗi STRING
            password: hashPassWordMd5       // mã hóa password
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

// 5. DELETE - USER - 
// 5.1. "CONFIRM DIALOG" : khai báo "ID" trong PATH_URL
    module.exports.deleteFormConfirm = async (req, res, next) => {
        console.log('req.params', req.params);
        const idDetail = req.params?.id || '';  // lấy value_ID trên URL
        
        // truy vấn:
            // MODEL.FINDONE : trả về "1 PHẦN TỬ"
                const userDetail = await userModel.findOne({ _id: idDetail });

        res.render('users/delete', { user: userDetail });
    };

// 5.2. "XÓA TRONG - DATABASE"
    module.exports.deleteRequest = async (req, res, next) => {
        console.log('req.body', req.body);
        const idDelete = req.body?.userId || '';  // lấy value_ID trên URL
        
        // truy vấn:
            // MODEL.DELETE ONE : xóa "1 PHẦN TỬ"
                const userDelete = await userModel.deleteOne({ _id: idDelete });
                console.log('delete - userDelete: ', userDelete);


            // MODEL.FIND : truy van "ALL PHẦN TỬ"
                const userList = await userModel.find({});
                console.log('sau delete - userList: ', userList);

        res.render('users/index', { userList: userList });
    };
