const express = require("express")
const router = express.Router()

const GeneralController = require("../controllers/general")

router.get("/", GeneralController.Home)

module.exports = router