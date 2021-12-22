const express = require('express')
const router = express.Router()
module.exports = router;

const goodsRouter = require('./goods')
const userRouter = require('./user')
const uploadRouter = require('./upload')

// CORS跨域
router.use(function(req,res,next){
    res.set({
        'Access-Control-Allow-Origin':"*"
    })
    next();
})

// 数据接口（路由）
router.use(express.urlencoded(),express.json())

// /api/goods
router.use('/goods',goodsRouter)

// /api/user
router.use('/user',userRouter)

// /api/upload
router.use('/upload',uploadRouter)

// jsonp
const data = {
    username:'laoxie',
    age:18,
    role:'admin'
}
router.get('/jsonp',(req,res)=>{
    // 接收参数你
    const {callback} = req.query;
    // res.send('hello jsonp')
    res.send(`${callback}(${JSON.stringify(data)})`)
})