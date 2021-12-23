const express = require('express')

// 创建路由中间件
const router = express.Router()
module.exports = router;

let goodslist = []

for (let i = 0; i < 20; i++) {
    const goods = {
        id: i + 1,
        name: 'goods' + i,
        price: (Math.random() * 1000).toFixed(2),
        imgurl: `img/goods${i}.jpg`
    }

    goodslist.push(goods)
}



// 商品列表
// get /api/goods/list
router.get('/list', function (req, res) {
    console.log('goodslist');

    // 设置响应头
    // res.set({
    //     'Access-Control-Allow-Origin':"*"
    // })


    res.send(goodslist);
})

// 获取单个商品信息 
// 动态路由：/api/goods/1,/goods/1/check
router.get('/:id/:type?', (req, res) => {
    // const {id} = req.query
    const { id } = req.params;
    console.log('params', req.params)
    const currentGoods = goodslist.find((item) => {
        return item.id == id
    })


    res.send(currentGoods)
})

// 增加
// /api/goods
router.post('/', (req, res) => {
    console.log('添加', req.body);
    console.log('请求头', req.get('hello'))
    res.send('添加成功')
})

// 修改: put /api/goods
router.put('/:id', (req, res) => {
    const { id } = req.params

    const currentGoods = goodslist.find((item) => {
        return item.id == id
    })
    console.log('update', req.body);

    res.send(currentGoods)
})
// 删除商品
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('id', id);
    goodslist = goodslist.filter(item => {
        return item.id != id
    })

    res.send(`删除商品${id}成功`)
})