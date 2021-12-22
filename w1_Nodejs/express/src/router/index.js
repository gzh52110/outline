const express = require('express')
const router = express.Router()
module.exports = router;

const goodsRouter = require('./goods')
const userRouter = require('./user')
const uploadRouter = require('./upload')

// 数据接口（路由）
router.use(express.urlencoded(),express.json())

// /api/goods
router.use('/goods',goodsRouter)

// /api/user
router.use('/user',userRouter)

// /api/upload
router.use('/upload',uploadRouter)