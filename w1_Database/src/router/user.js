const express = require('express');
const router = express.Router();
module.exports = router;

// const mysql = require('mysql')
// 方式一：连接对象，创建连接对象，并配置参数
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'jiaoxue'
// });

// 方式二：使用连接池
// var pool  = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     //port: 3306,
//     database: 'jiaoxue',
//     //multipleStatements: true
// });

const mysql = require('../db/mysql');// {query}

// 注册
router.post('/reg', async (req, res) => {
    // 1. 接收前端参数
    const { username, password } = req.body;
    let sql = `insert into user(username,password) values('${username}','${password}')`

    // 2. 写入数据库
    // // 连接数据库
    // connection.connect();
    // // 查询数据库

    // connection.query(sql, function (error, results, fields) {
    //     console.log('The solution is: ', error, results, fields);

    //     // 3. 响应到前端
    //     if(error){
    //         res.send('注册失败')
    //     }else{
    //         res.send('注册成功')
    //     }

    //      // 关闭连接,释放资源
    //     connection.end();
    // });


    // pool.query(sql,(err,result)=>{
    //     console.log(err,result);
    //     // 3. 响应到前端
    //     if(err){
    //         res.send('注册失败')
    //     }else{
    //         res.send('注册成功')
    //     }
    // })

    // 回调函数写法
    // mysql.query(sql,function(result){
    //     res.send(result);
    // })

    // promise写法
    // mysql.query(sql).then((result)=>{

    // }).catch((err)=>{})

    try {
        await mysql.query(sql);
        res.send('注册成功')
    } catch (err) {
        res.send('注册失败')
    }
})

// 登录
router.get('/login', async (req, res) => {
    const { username, password } = req.query;
    let sql = `select * from user where username='${username}' and password='${password}'`

    console.log('sql',sql);

    try {
        const result = await mysql.query(sql)
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send('用户名或密码错误')
        }
    } catch (err) {
        res.send('登录失败')
    }
})

// 获取单个用户信息
router.get('/:id', (req, res) => {

})

// 获取用户列表
router.get('/list', (req, res) => {

})