const express = require('express')
const router = express.Router();
module.exports = router;

const path = require('path')
const multer = require('multer')

const uploadPath =  path.join(__dirname,'../../public/uploads/')

// 1.简单上传：设置上传文件路径
// let upload = multer({ dest: uploadPath })


// 2. 控制上传细节
let storage = multer.diskStorage({
    // 上传文件保存目录，无则自动创建
    destination: uploadPath,

    // 格式化文件名
    filename: function (req, file, cb) {
        // 获取文件后缀名
        let ext = path.extname(file.originalname);

        // 设置文件名
        const filename = file.fieldname + '-' + Date.now() + ext
        // 调用cb回调函数，修改文件名
        cb(null, filename);
    }
})
let upload = multer({
    storage,
    // 控制上传文件大小
    limits:{
        fieldSize:1024*1024*2
    },
    // 控制上传文件类型
    fileFilter(req, file, cb){
        
        const allow = /png|jpeg|gif/.test(file.mimetype)
        cb(null,allow);
    }
});



// 单个文件上传中间件
const singleMiddleware = upload.single('avatar')

router.post('/avatar', singleMiddleware, (req, res) => {
    // req.body
    // 使用multer中间件后，会把请求体中的单个文件数据格式化到req.file
    console.log('req.file', req.file)
    res.send('上传成功')
})

const multipleMiddleware = upload.array('goods',5)
router.post('/goods', multipleMiddleware, (req, res) => {
    // req.body
    // 使用multer中间件后，会把请求体中的多个文件数据格式化到req.files
    console.log('req.files', req.files)
    res.send('上传成功')
})