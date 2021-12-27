const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    //port: 3306,
    database: 'jiaoxue',
    //multipleStatements: true
});

// function query(sql, callback) {
//     pool.query(sql, function (err, result) {
//         callback(result)
//     })
// }

function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (err, result) {
            if(err){
                reject(err);
            }
            resolve(result)
        })
    })
}


module.exports = {
    query
}