const mysql = require('mysql');

mysql.createConnection({

})
let db = mysql.createPool({
    host: "112.74.108.226", //阿里云数据库访问接口
    port:"3306",
    user: "dms",
    password: "12345678Ldt.",
    database: "idiom-project"//数据库
})

module.exports = db;