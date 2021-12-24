const express = require('express')
const router = express.Router()
module.exports = router;

// 模拟数据
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

// 商品列表SSR
router.get('/goodslist',(req,res)=>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>商品列表</title>
    </head>
    <body>
        <h1>商品列表</h1>
        <ul id="goodslist">
            ${
                goodslist.map(item=>{
                    return `<li data-id="${item.id}">
                        <img src="${item.imgurl}" />
                        <h4>${item.name}</h4>
                        <p class="price">${item.price}</p>
                    </li>`
                }).join('')
            }
        </ul>
    </body>
    </html>`
    res.send(html);
})
