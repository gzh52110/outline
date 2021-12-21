const express = require('express')
const path = require('path')

const app = express();

// 静态资源服务器
// 如果匹配到静态资源，则响应，否则内部自动next()
const staticMiddleware = express.static(path.join(__dirname,'../public'));
app.use(staticMiddleware);
// console.log('staticMiddleware',staticMiddleware)


// 自定义中间件
// app.use(function(req,res,next){
//     console.log('自定义中间件1')
//     next();
// })
// app.use(function(req,res,next){
//     console.log('自定义中间件2')
//     next();
// },function(req,res,next){
//     console.log('自定义中间件3')
//     next();
// })

// // 带路径的中间件
// app.use('/goods',(req,res)=>{
//     // 只有在请求路径匹配/goods时进入中间件，一般带路径的中间件可以不使用next
//     console.log('goods中间件')
// })

let goodslist = []

for(let i=0;i<20;i++){
    const goods = {
        id:i+1,
        name:'goods'+i,
        price:(Math.random()*1000).toFixed(2),
        imgurl:`img/goods${i}.jpg`
    }

    goodslist.push(goods)
}

// 数据接口
// 商品列表
app.get('/goodslist',function(req,res){
    console.log('goodslist');


    res.send(goodslist);
})

// 获取单个商品信息 
app.get('/goods',(req,res)=>{
    const {id} = req.query
    const currentGoods = goodslist.find((item)=>{
        return item.id == id
    })

    res.send(currentGoods)
})
// 删除商品
app.delete('/goods',(req,res)=>{
    const {id} = req.query
   goodslist = goodslist.filter(item=>{
       return item.id != id
   })

    res.send(`删除商品${id}成功`)
})

app.get('/login',function(req,res){
    console.log('login');

    res.send('登录成功');
})
app.post('/reg',function(req,res){
    console.log('reg');

    res.send('注册成功');
})

app.listen(2110,()=>{
    console.log('server is running at port 2110');
})