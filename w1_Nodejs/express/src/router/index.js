const express = require('express')
const router = express.Router()
module.exports = router;

const goodsRouter = require('./goods')
const userRouter = require('./user')
const uploadRouter = require('./upload')

// CORS跨域

// 白名单
const whilelist = ['http://localhost:8080','http://localhost:3000']
router.use(function(req,res,next){
    // 获取请求源（从哪发起的请求）
    const Origin = req.get('Origin')

    // 判断请求源是否在白名单中
    if(whilelist.includes(Origin)){
        res.set({
            'Access-Control-Allow-Origin':Origin
        })
    }

    // 处理复杂跨域中的预检请求
    if(req.method=="OPTIONS") {
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");
        res.sendStatus(200);/*让options请求快速返回*/
    }else{

        next();
    }

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

// 服务器代理
const { createProxyMiddleware } = require('http-proxy-middleware');

// 代理目标：https://offer.qfh5.cn
// 请求：http://localhost:2110/api/offer//iq?sort=hot&total=false
// 修改Origin: https://offer.qfh5.cn/api/offer/iq?sort=hot&total=false
// 重写路径：https://offer.qfh5.cn/api/iq?sort=hot&total=false
const offerProxy = createProxyMiddleware({
    target:'https://offer.qfh5.cn',
    changeOrigin:true,

    // 重写路径：请求路径与目标路径不一致时重写路径
    pathRewrite:{
        '^/api/offer':'/api'
    }
})
// /api/offer
router.use('/offer',offerProxy)