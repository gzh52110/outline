const express = require('express')
const path = require('path')
const app = express()

// 把路径转成绝对路径：
// __dirname: 当前文件server.js所在的目录（绝对路径）
// __filename: 当前文件所在路径（绝对路径）
const realPath = path.join(__dirname,'../public')
console.log('__filename',__filename)
console.log('__dirname',__dirname)
console.log('realPath',realPath)


// 静态资源服务器
app.use(express.static(realPath))

app.listen(2110,()=>{
    console.log('hello 2110')
})