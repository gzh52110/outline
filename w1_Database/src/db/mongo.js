const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'h52110'
// 创建并连接
// MongoClient.connect(url,(err,client)=>{})

// 1.创建客户端对象
const client = new MongoClient(url)

// 2.连接mongoDB
client.connect().then(async ()=>{
    // 3. 匹配数据库
    const db = client.db(dbName)

    // 4. 选择集合
    const col = db.collection('user')

    // 5. CRUD
    // col.insertMany([doc])
    // col.deleteMany(query)
    // col.updateMany(query,data)
    // col.find(query)
    let cursor = col.find()

    cursor = cursor.sort({age:-1})

    const res = await cursor.toArray()
    console.log('res',res);

    // 查询完成释放资源
    client.close();
})
// 命令行
// 1. mongo
// 2. use DBNAME
// 3. db.user
// 4. db.user.find()