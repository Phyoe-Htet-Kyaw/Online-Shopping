const db = require("../../database/db")

exports.Home = (req, res) => {
    db.query(`SELECT * FROM category LIMIT 11`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render("user/index", { category: rows })
        }
    })
}