const db = require("../../database/db")

const fetchCategoryTwo = (req, res, msg) => {
    db.query(`SELECT * FROM category WHERE id="${req.params.id}"`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render("admin/category/edit-category", { category: rows[0], message: msg })
        }
    })
}

exports.AddValidate = (req, res, next) => {
    var name = req.body.name
    var category_id = req.body.category_id

    if(name == ""){
        res.render("admin/category/add-category", { message: "Please enter name!" })
    }else{
        if(category_id == ""){
            res.render("admin/category/add-category", { message: "Please select category!" })
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

