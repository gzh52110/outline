/*
    模块化路由
*/
const path = require('path')
const express = require('express')
const router = require('./router')

const app = express()

app.use(express.static(path.join(__dirname,'../public')))

// 数据接口
app.use('/api',router)

app.listen(2110,()=>{
    console.log('server is running at port 2110')
})