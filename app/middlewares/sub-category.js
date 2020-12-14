const db = require("../../database/db")

const fetchCategoryOne = (res, msg) => {
    db.query(`SELECT *  FROM category`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render("admin/sub-category/add-sub-category", { category: rows, message: msg })
        }
    })
}

const fetchCategoryTwo = (req, res, msg) => {
    var category
    db.query(`SELECT *  FROM category`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            category = rows
        }
    })

    db.query(`SELECT * FROM sub_category WHERE id="${req.params.id}"`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render("admin/sub-category/edit-sub-category", { category: category, sub_category: rows[0], message: msg })
        }
    })
}

exports.AddValidate = (req, res, next) => {
    var name = req.body.name
    var category_id = req.body.category_id

    if(name == ""){
        fetchCategoryOne(res, "Please enter name!")
    }else{
        if(category_id == ""){
            fetchCategoryOne(res, "Please select category!")
        }else{
            next()
        }
    }
} 

exports.EditValidate = (req, res, next) => {
    var name = req.body.name
    var category_id = req.body.category_id

    if(name == ""){
        fetchCategoryTwo(req, res, "Please enter name!")
    }else{
        if(category_id == ""){
            fetchCategoryTwo(req, res, "Please select category!")
        }else{
            next()
        }
    }
} 

