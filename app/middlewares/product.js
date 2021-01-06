const db = require("../../database/db")
const fs = require("fs")

const fetchCategoryOne = (res, msg) => {
    db.query(`SELECT * FROM category`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render("admin/product/add-product", { category: rows, message: msg })
        }
    })
}

const fetchCategoryTwo = (req, res, msg) => {
    var category
    db.query(`SELECT * FROM category`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            category = rows
        }
    })

    db.query(`SELECT * FROM products WHERE id=${req.params.id}`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render("admin/product/edit-product", { category: category, product: rows[0], message: msg })
        }
    })
}

exports.AddValidate = (req, res, next) => {
    let name = req.body.name
    let price = req.body.price
    let qty = req.body.qty
    let category_id = req.body.category_id
    let description = req.body.description
    let instock = req.body.instock  
    
    if(name == ""){
        fetchCategoryOne(res, "Please enter product name!")
    }else{
        if(price == ""){
            fetchCategoryOne(res, "Please enter product price!")
        }else{
            if(qty == ""){
                fetchCategoryOne(res, "Please enter product quantity!")
            }else{
                if(category_id == ""){
                    fetchCategoryOne(res, "Please select category!")
                }else{
                    if(description == ""){
                        fetchCategoryOne(res, "Please enter description!")
                    }else{
                        if(instock == ""){
                            fetchCategoryOne(res, "Please select instock is or not!")
                        }else{
                            if(req.files.length == 0){
                                fetchCategoryOne(res, "Please select product photo!")
                            }else{
                                next()
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.EditValidate = (req, res, next) => {
    console.log(req.body.name)
    let name = req.body.name
    let price = req.body.price
    let qty = req.body.qty
    let category_id = req.body.category_id
    let description = req.body.description
    let instock;
    if(req.body.instock == "on"){
        instock = 1;
    }else{
        instock = 0;
    }
    
    if(name == ""){
        fetchCategoryTwo(req, res, "Please enter product name!")
    }else{
        if(price == ""){
            fetchCategoryTwo(req, res, "Please enter product price!")
        }else{
            if(qty == ""){
                fetchCategoryTwo(req, res, "Please enter product quantity!")
            }else{
                if(category_id == ""){
                    fetchCategoryTwo(req, res, "Please select category!")
                }else{
                    if(description == ""){
                        fetchCategoryTwo(req, res, "Please enter description!")
                    }else{
                        if(instock == ""){
                            fetchCategoryTwo(req, res, "Please select instock is or not!")
                        }else{
                            if(req.files.length == 0){
                                db.query(`UPDATE products SET name="${req.body.name}", instock="${instock}", price="${req.body.price}", discount_price="${req.body.discount_price}", qty="${req.body.qty}", description="${req.body.description}", category_id="${req.body.category_id}" WHERE id=${req.params.id}`, (err, rows, fields) => {
                                    if(err){
                                        console.log(err)
                                    }else{
                                        next()
                                    }
                                })
                            }else{

                                db.query(`SELECT * FROM products WHERE id="${req.params.id}"`, (sql_err_2, rows, fields) => {
                                    if(sql_err_2){
                                        console.log(sql_err_2)
                                    }else{
                                        if(rows[0].photo != ""){
                                            let photo = rows[0].photo.split(",")
                                            photo.map(item => {
                                                if(item != ""){
                                                    fs.unlinkSync("./assets/uploads/" + item)
                                                }
                                            })
                                        }
                                    }
                                })

                                const img_files = req.files
                                var img_name = ""
                                img_files.map(item => {
                                    img_name += item.filename + ","
                                })

                                db.query(`UPDATE products SET name="${req.body.name}", instock="${instock}", price="${req.body.price}", discount_price="${req.body.discount_price}", qty="${req.body.qty}", description="${req.body.description}", photo="${img_name}", category_id="${req.body.category_id}" WHERE id=${req.params.id}`, (err, rows, fields) => {
                                    if(err){
                                        console.log(err)
                                    }else{
                                        next()
                                    }
                                })
                                
                            }
                        }
                    }
                }
            }
        }
    }
}