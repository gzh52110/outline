const express = require('express');
const router = express.Router();
module.exports = router;

const mysql = require('../db/mysql')

// 获取商品列表
// get /api/goods/list
router.get('/list',async (req,res)=>{
    let sql = `select * from goods`;

    console.log('sql',sql);

    try{
        const result = await mysql.query(sql)
        res.send(result);
    }catch(err){
        res.send('查询失败')
    }
})

// 获取单个商品
router.get('/:id',(req,res)=>{
    
})

// 添加商品
// post /api/goods
router.post('/',(req,res)=>{
    const {name,price,imgurl} = req.body
})

// 删除商品
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
})

// 修改商品
router.put('/:id',(req,res)=>{
    const {id} = req.params;
})

// 搜索商品
// get /api/goods/search?keyword=xxx
router.get('/search',(req,res)=>{
   const {keyword} = req.query;
})