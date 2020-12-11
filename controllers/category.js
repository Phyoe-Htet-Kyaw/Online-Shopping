const db = require("../database/db")

exports.Index = (req, res) => {
    db.query("SELECT * FROM category ORDER BY id DESC", (err, rows, fields) => {
        if(!err){
            res.render("admin/category/category", {category: rows})
        }else{
            console.log(err)
        }
    })
    
}

exports.Add = (req, res) => res.render("admin/category/add-category")

exports.Store = (req, res) => {
    if(req.body.name == ""){
        res.render("admin/category/add-category", {message: "Please Enter name"})
    }else{
        db.query(`INSERT INTO category (name) VALUES ("${req.body.name}")`, (err, rows, fields) => {
            if(!err){
                res.redirect("/admin/category")
            }else{
                console.log(err)
            }
        })
    }
}

exports.Edit = (req, res) => {
    console.log(req.params.id)
    db.query(`SELECT * FROM category WHERE id="${req.params.id}"`, (err, rows, fields) => {
        if(!err){
            res.render("admin/category/edit-category", { category: rows[0] })
        }else{
            console.log(err)
        }
    })
    
}

exports.Update = (req, res) => {
    if(req.body.name == ""){
        db.query(`SELECT * FROM category WHERE id="${req.params.id}"`, (err, rows, fields) => {
            if(!err){
                res.render("admin/category/edit-category", { category: rows[0], message: "Please Enter Name" })
            }else{
                console.log(err)
            }
        })
    }else{
        db.query(`UPDATE category SET name="${req.body.name}" WHERE id=${req.params.id}`, (err, rows, fields) => {
            if(!err){
                res.redirect("/admin/category")
            }else{
                console.log(err)
            }
        })
    }
}

exports.Delete = (req, res) => {
    db.query(`DELETE FROM category WHERE id=${req.params.id}`, (err, rows, fields) => {
        if(!err){
            res.redirect("/admin/category")
        }else{
            console.log(err)
        }
    })
}