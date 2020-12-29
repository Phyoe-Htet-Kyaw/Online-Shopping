const db = require("../../database/db")

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

exports.AddValidate = (req, res) => {
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
                            return true
                        }
                    }
                }
            }
        }
    }
}

exports.EditValidate = (req, res) => {
    let name = req.body.name
    let price = req.body.price
    let qty = req.body.qty
    let category_id = req.body.category_id
    let description = req.body.description
    let instock = req.body.instock 
    
    console.log(req.body)
    
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
                            return true
                        }
                    }
                }
            }
        }
    }
}