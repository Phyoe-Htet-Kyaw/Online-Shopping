const express = require("express")
const router = express.Router()

const CategoryController = require("../app/controllers/category") 
const ProductController = require("../app/controllers/product")
const SubCategoryController = require("../app/controllers/sub-category")

const SubCategoryMiddleware = require("../app/middlewares/sub-category")
const CategoryMiddleware = require("../app/middlewares/category")


var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, 'photo_' + Date.now() + '.' + file.originalname.split(".")[1])
    }
  })
  
var upload = multer({ storage: storage })

router.get('/delete_sub_category/:id', SubCategoryController.Delete)
router.post('/update_sub_category/:id', SubCategoryMiddleware.EditValidate, SubCategoryController.Update)
router.get('/edit_sub_category/:id', SubCategoryController.Edit)
router.post('/store_sub_category', SubCategoryMiddleware.AddValidate, SubCategoryController.Store)
router.get('/add_sub_category', SubCategoryController.Add)
router.get('/sub_category', SubCategoryController.Index)

router.get('/detail_product/:id', ProductController.Detail)
router.get('/delete_product/:id', ProductController.Delete)
router.post('/update_product/:id', ProductController.Update)
router.get('/edit_product/:id', ProductController.Edit)
router.post('/store_product', upload.array('photo', 5), ProductController.Store)
router.get('/add_product', ProductController.Add)
router.get("/product", ProductController.Index)

router.get("/delete_category/:id", CategoryController.Delete)
router.post("/update_category/:id", CategoryMiddleware.EditValidate, CategoryController.Update)
router.get("/edit_category/:id", CategoryController.Edit)
router.post("/store_category", CategoryMiddleware.AddValidate, CategoryController.Store)
router.get("/add_category", CategoryController.Add)
router.get("/category", CategoryController.Index)

router.get("/", (req, res) => res.render("admin/index"))

module.exports = router