const e = require("express");
const db = require("../database/db");
const router = require("../routes/admin");

exports.Index = (req, res) => {
    db.query(`SELECT sub_category.id, sub_category.name, category.name AS category FROM sub_category INNER JOIN category ON sub_category.category_id=category.id ORDER BY sub_category.id DESC`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render("admin/sub-category/sub-category", { sub_category: rows });
        }
    })
}

exports.Add = (req, res) => {
    db.query(`SELECT *  FROM category`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.render("admin/sub-category/add-sub-category", { category: rows })
        }
    })
}

exports.Store = (req, res) => {
    db.query(`INSERT INTO sub_category (name, category_id) VALUES ("${req.body.name}", "${req.body.category_id}")`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.redirect("/admin/sub_category")
        }
    })
}

exports.Edit = (req, res) => {
    var category
    db.query(`SELECT * FROM category`, (err, rows, fields) => {
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
            res.render("admin/sub-category/edit-sub-category", { category: category, sub_category: rows[0] })
        }
    })
}

exports.Update = (req, res) => {
    db.query(`UPDATE sub_category SET name="${req.body.name}", category_id="${req.body.category_id}" WHERE id=${req.params.id}`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.redirect("/admin/sub_category")
        }
    })
}

exports.Delete = (req, res) => {
    db.query(`DELETE FROM sub_category WHERE id=${req.params.id}`, (err, rows, fields) => {
        if(err){
            console.log(err)
        }else{
            res.redirect("/admin/sub_category")
        }
    })
}