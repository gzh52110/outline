const express = require('express');
const path = require('path')
const router = require('./router')

const app = express();

// 静态资源服务器
const staticPath = path.join(__dirname,'../public')
app.use(express.static(staticPath))

// 接口
app.use('/api',router)

const PORT = 2110;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})