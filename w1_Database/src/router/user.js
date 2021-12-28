const express = require('express');
const router = express.Router();
module.exports = router;

const db = require('../db')
const colName = 'user';

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

// const mysql = require('../db/mysql');// {query}

// 注册
router.post('/reg', async (req, res) => {
    // 1. 接收前端参数
    const { username, password } = req.body;

    // @mysql
    // let sql = `insert into user(username,password) values('${username}','${password}')`

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

    // try {
    //     await mysql.query(sql);
    //     res.send('注册成功')
    // } catch (err) {
    //     res.send('注册失败')
    // }

    // @mongodb
    const result = await db.insert(colName, { username, password })
    console.log('result', result)
    if (result) {
        res.send('注册成功')
    } else {
        res.send('注册失败')
    }
})

// 登录
router.get('/login', async (req, res) => {
    const { username, password } = req.query;
    let sql = `select * from user where username='${username}' and password='${password}'`

    console.log('sql', sql);

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


// 获取用户列表
// get /api/user/list
router.get('/list', async (req, res) => {
    const { page = 1, size = 10 } = req.query;

    // 计算跳过的数量与限制数量
    const skip = (page - 1) * size
    const limit = Number(size);

    const result = await db.query(colName, {}, {
        skip, limit, projection: {
            password: 0
        }
    })

    res.send(result);
})

// 获取单个用户信息
// get /api/user/list
router.get('/:id', (req, res) => {

})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { password, age, role, gender } = req.body;

    // 练习：封装一个方法formatData()实现参数处理
    // const newData = formatData(req.body,['password','age','role','gender'])
    const newData = {}
    if (password) {
        newData.password = password
    }
    if (age) {
        newData.age = age
    }
    if (role) {
        newData.role = role
    }
    if (gender) {
        newData.gender = gender
    }

    let result;
    try {
        await db.update(colName, { _id: id }, { $set: newData })
        result = true;
    } catch (err) {
        result = false;
    }

    res.send(result ? '更新成功' : '更新失败')
})
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await db.del(colName, { _id: id })
    res.send(result ? '删除成功' : '删除失败')
})

