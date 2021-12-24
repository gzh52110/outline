/*
    模块化路由
*/
const path = require('path')
const express = require('express')
const router = require('./router')
const ssrRouter = require('./ssr')

const app = express()

app.use(express.static(path.join(__dirname,'../public')))

// 设置模板引擎
app.set('views', path.join(__dirname,'./template'));
app.set('view engine', 'ejs');

// 数据接口
app.use('/api',router)

// SSR
app.use('/ssr',ssrRouter)

app.listen(2110,()=>{
    console.log('server is running at port 2110')
})