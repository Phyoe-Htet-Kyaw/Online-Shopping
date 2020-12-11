const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')

const db = require("./database/db")

db.connect(err => {
    if(err){
        console.log("Database connection failed!", err)
    }else{
        console.log("Database connection success!")
    }
})

const AdminRouter = require('./routes/admin')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use("/assets", express.static(path.join(__dirname, "assets")))


app.use('/admin',AdminRouter);
app.get('/', (req, res) => {
    res.render("index")
})

app.listen(3000, () => console.log("SERVER IS RUNNING ON PORT 3000"))