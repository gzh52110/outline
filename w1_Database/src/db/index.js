const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'h52110'

/**
 * 连接Mongodb
 */
async function connect() {
    const client = new MongoClient(url)

    // 连接mongo
    await client.connect()

    // 使用数据库: use h52110
    // 必须连接成功后才可使用
    const db = client.db(dbName)

    return { db, client }
}

/**
 * 添加
 * @param {String} colName 集合名称
 * @param {Object|Array} data 待插入的数据
 * @return {Boolean}    数据写入是否成功
 */
async function insert(colName, data) {
    const { db, client } = await connect()
    // 选择集合
    const col = db.collection(colName)

    let result;
    try {
        if (Array.isArray(data)) {
            result = await col.insertMany(data)
        } else {
            result = await col.insertOne(data)
        }
        result = true;
    } catch (err) {
        result = false
    }

    // 关闭客户端连接，释放资源占用
    client.close()

    return result;
}
// insert('user',{username:'xxx',password:123})
// insert('goods',[{username:'xxx',password:123},{username:'xxx',password:123}])

/**
 * 删除
 * @param {String} colName 集合名称
 * @param {Object} filter  查询条件
 * @returns {Boolean}   删除是否成功
 */
async function del(colName, filter) {
    const { db, client } = await connect()
    const col = db.collection(colName)

    // 转换id为ObjectId
    if (typeof filter._id === 'string') {
        filter._id = ObjectId(filter._id)
    }

    let result;
    try {
        result = await col.deleteMany(filter)
        result = result.deletedCount > 0;
    } catch (err) {
        result = false
    }

    client.close()

    return result;
}
// del('goods',{_id})

/**
 * 
 * @param {String} colName 集合名称
 * @param {Object} filter 查询条件
 * @param {Object} data 更新的数据（包含操作符的对象）
 */
async function update(colName,filter,data) {
    // data: {$set:newData,$inc:{key:value}}
    const { db, client } = await connect()
    const col = db.collection(colName)

    if (typeof filter._id === 'string') {
        filter._id = ObjectId(filter._id)
    }

    let result
    try{
        await col.updateMany(filter,data)
        result = true;
    }catch(err){
        result = false;
    }

    client.close()

    return result;
}

/**
 * 查询
 * @param {String} colName 集合名称
 * @param {Object} filter 查询条件
 * @param {Object} options 其他选项
 * @returns {Array} 查询结果
 */
async function query(colName,filter={},options={}) {
    const { db, client } = await connect()
    const col = db.collection(colName)

    if (typeof filter._id === 'string') {
        filter._id = ObjectId(filter._id)
    }

    let cursor = col.find(filter,{
        projection:options.projection
    })

    // 跳过数量
    if(options.skip){
        cursor = cursor.skip(options.skip)
    }

    if(options.limit){
        cursor.limit(options.limit)
    }

    const result = await cursor.toArray()


    client.close();

    return result
}

module.exports = {
    insert,
    del,
    update,
    query,
}