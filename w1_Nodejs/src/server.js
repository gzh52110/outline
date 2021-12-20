const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('./mime')

// 创建一个服务器
// const app = http.createServer((request,response)=>{
//     // request： 请求对象，用户获取前端发送过来的信息
//     // response：响应对象，一般用户给客户端响应内容

//     // 设置响应头：
//     // Content-Type:告诉客户端响应的是什么内容
//     response.writeHead(200,{
//         'Content-Type':'text/html;charset=utf-8'
//     })

//     // 给客户端响应内容（默认为文本内容：text/plain）
//     response.write('hello ')
//     response.write('<strong>jingjing</strong>')
//     response.write('你好吗')
//     response.end('!')
// })

// 静态资源服务器：
const app = http.createServer((request,response)=>{
    // 根据不同的请求响应不同的内容

    // 获取用户请求的地址
    const url = request.url;

    // 转成绝对地址
    const realPath = path.join(__dirname,url)

    console.log('url',url,realPath)

    // 获取文件后缀名
    const ext = path.extname(url).substr(1); // .html->html,.css->css
    console.log('ext',ext)

    // 读取文件
    fs.readFile(realPath,(err,content)=>{
        console.log('content',content)
        response.writeHead(200,{
            // 需要为每一种静态资源（图片，css,js,html等文件）设置content-type：根据文件后缀名设置不同的类型
            'Content-Type':`${mime[ext]};charset=utf-8`
        })
        response.end(content)
    })

})

app.listen(2110,()=>{
    console.log('服务器启动成功...')
})