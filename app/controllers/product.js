const db = require("../../database/db")
const multer = require('multer')
const path = require("path")
const fs = require("fs")
const Middleware = require("../middlewares/product")

exports.Index = (req, res) => {
    db.query("SELECT products.id, products.name, products.instock, products.price, products.discount_price, products.qty, products.photo, products.description, category.name AS category FROM products INNER JOIN category ON products.category_id=category.id ORDER BY products.id DESC", (err, rows, fields) => {
        if(!err){
            res.render("admin/product/product", { product: rows })
        }else{
            console.log(err)
        }
    })
}

exports.Add = (req, res) => {
    db.query(`SELECT * FROM category`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            console.log(rows)
            res.render("admin/product/add-product", { category: rows })
        }
    })
}

const showCategoryWithMessage = (res, msg) => {
    db.query(`SELECT * FROM category`, (sql_err, rows, fields) => {
        if(sql_err){
            console.log(err)
        }else{
            res.render("admin/product/add-product", { category: rows, message: msg })
        }
    })
}

exports.Store = (req, res) => {
    const img_files = req.files
    var img_name = ""
    img_files.map(item => {
        img_name += item.filename + ","
    })
    var instock;
    if(req.body.instock == "on"){
        instock = 1;
    }else{
        instock = 0;
    }
    db.query(`INSERT INTO products (name, instock, price, discount_price, qty, description, photo, category_id) VALUES ("${req.body.name}", "${instock}", "${req.body.price}", "${req.body.discount_price}", "${req.body.qty}", '${req.body.description}', "${img_name}", "${req.body.category_id}")`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.redirect("/admin/product")
        }
    })
}

exports.Edit = (req, res) => {
    var category;
    db.query(`SELECT * FROM category`, (sql_err, rows, fields) => {
        if(sql_err){
            console.log(sql_err)
        }else{
            category = rows
        }
    })

    db.query(`SELECT * FROM products WHERE id="${req.params.id}"`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render('admin/product/edit-product', { category: category, product: rows[0] })
        }
    })
}

exports.Detail = (req, res) => {
    db.query(`SELECT products.id, products.name, products.instock, products.price, products.discount_price, products.qty, products.photo, products.description, category.name AS category FROM products INNER JOIN category ON products.category_id=category.id WHERE products.id=${req.params.id}`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            console.log(rows)
            res.render('admin/product/detail-product', { product: rows[0] })
        }
    })
}

exports.Update = (req, res) => {
    upload(req, res, (err) => {
        if(Middleware.EditValidate(req, res)){
            if(err){
                var category;
                db.query(`SELECT * FROM category`, (sql_err, rows, fields) => {
                    if(sql_err){
                        console.log(sql_err)
                    }else{
                        category = rows
                    }
                })
    
                db.query(`SELECT * FROM products WHERE id="${req.params.id}"`, (sql_err_2, rows, fields) => {
                    if(sql_err_2){
                        console.log(sql_err_2)
                    }else{
                        product = rows[0]
                        res.render('admin/product/edit-product', { category: category, product: rows[0], message: err })
                    }
                })
            }else{
                if(req.file == undefined){
                    var instock;
                    if(req.body.instock == "on"){
                        instock = 1;
                    }else{
                        instock = 0;
                    }
                    db.query(`UPDATE products SET name="${req.body.name}", instock="${instock}", price="${req.body.price}", discount_price="${req.body.discount_price}", qty="${req.body.qty}", description="${req.body.description}", category_id="${req.body.category_id}" WHERE id=${req.params.id}`, (err, rows, fields) => {
                        if(err){
                            console.log(err)
                        }else{
                            res.redirect("/admin/product")
                        }
                    })
                }else{
                    db.query(`SELECT * FROM products WHERE id="${req.params.id}"`, (sql_err_2, rows, fields) => {
                        if(sql_err_2){
                            console.log(sql_err_2)
                        }else{
                            fs.unlinkSync("./assets/uploads/" + rows[0].photo)
                        }
                    })
                    var instock;
                    if(req.body.instock == "on"){
                        instock = 1;
                    }else{
                        instock = 0;
                    }
                    db.query(`UPDATE products SET name="${req.body.name}", instock="${instock}", price="${req.body.price}", discount_price="${req.body.discount_price}", qty="${req.body.qty}", description="${req.body.description}", photo="${req.file.filename}", category_id="${req.body.category_id}" WHERE id=${req.params.id}`, (err, rows, fields) => {
                        if(err){
                            console.log(err)
                        }else{
                            res.redirect("/admin/product")
                        }
                    })
                }
            }
        }
    })
}

exports.Delete = (req, res) => {
    db.query(`SELECT * FROM products WHERE id="${req.params.id}"`, (sql_err_2, rows, fields) => {
        if(sql_err_2){
            console.log(sql_err_2)
        }else{
            fs.unlinkSync("./assets/uploads/" + rows[0].photo)
        }
    })

    db.query(`DELETE FROM products WHERE id=${req.params.id}`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/admin/product')
        }
    })
}