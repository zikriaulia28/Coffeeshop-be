const { Router } = require("express")
const wellcomeRouter = Router()
const wellcomeController = require("../controllers/wellcome.controller")

wellcomeRouter.get("/", wellcomeController.wellcomePage)

module.exports = wellcomeRouter