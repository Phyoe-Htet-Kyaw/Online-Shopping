const mysql = require('mysql')
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "online_shop"
})

module.exports = mysqlConnection