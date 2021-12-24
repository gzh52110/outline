const express = require('express');
const router = express.Router();
module.exports = router;

const userRouter = require('./user')
const goodsRouter = require('./goods')
const uploadRouter = require('./upload')

const cors = require('../filter/cors')

// 允许跨域
router.use(cors)

// 格式化请求体参数
router.use(
    express.urlencoded({extended:true}),
    express.json()
)

router.use('/user',userRouter)
router.use('/goods',goodsRouter)
router.use('/upload',uploadRouter)