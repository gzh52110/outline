const express = require('express');
const router = express.Router();
module.exports = router;

// const mysql = require('../db/mysql')
const db = require('../db');
const { formatData } = require('../utils');

const colName = 'goods'

// 获取商品列表
// get /api/goods/list
router.get('/list', async (req, res) => {
    const { page = 1, size = 10, sort } = req.query;
    // const idx = (page-1)*size;
    // const qty = Number(size);
    // let sql = `select * from goods`;

    // if(sort){
    //     sql += ` order by ${sort}`
    //     if(desc){
    //         sql += ' desc';
    //     }
    // }


    // sql += ` limit ${idx},${qty}`

    // console.log('sql',sql);

    // try{
    //     const result = await mysql.query(sql)
    //     res.send(result);
    // }catch(err){
    //     res.send('查询失败')
    // }

    const limit = Number(size);
    const skip = (page - 1) * size
    try {
        const result = await db.query(colName, {}, { limit, skip, sort })
        res.send(formatData.success(result))
    } catch (err) {
        res.send(formatData.fail())
    }
})


// 添加商品
// post /api/goods
router.post('/', (req, res) => {
    const { name, price, imgurl } = req.body
})
// 搜索商品
// get /api/goods/search?keyword=xxx
router.get('/search', (req, res) => {
    const { keyword } = req.query;
})

// 批量删除
// delete /api/goods
router.delete('/',async (req,res)=>{
    const {ids} = req.body; // [id1,id2,id3]

    try {
        const result = await db.del(colName,{_id:ids})
        // id为字符串：{_id:ObjectId(id)}
        // id为数组：{_id:{$in:[ObjectId(id1),ObjectId(id2)]}}
        res.send(formatData({
            code: result ? 200 : 400
        }))
    }catch(err){
        res.send(formatData.fail())
    }
})

// 获取单个商品
router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const result = await db.query(colName, {_id:id})
        res.send(formatData.success(result[0]))
    } catch (err) {
        res.send(formatData.fail())
    }
})

// 删除商品
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.del(colName, {_id:id})
        res.send(formatData({
            code: result ? 200 : 400
        }))
    } catch (err) {
        res.send(formatData.fail())
    }
})

// 修改商品
router.put('/:id', (req, res) => {
    const { id } = req.params;
})

