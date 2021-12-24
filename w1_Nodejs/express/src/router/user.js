const express = require('express')

// 创建路由中间件
const router = express.Router()
module.exports = router;




// get /api/user/login
router.get('/login',function(req,res){
    console.log('login');

    res.send('登录成功');
})

// post /api/user/reg
router.post('/reg',function(req,res){
    console.log('reg',req.body);

    res.send('注册成功');
})