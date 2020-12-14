const express = require("express")
const router = express.Router()

const GeneralController = require("../app/controllers/general")

router.get("/", GeneralController.Home)

module.exports = router