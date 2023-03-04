const { Router } = require("express")
const productsController = require("../controllers/product.controlles")
const productsRouter = Router()

// Create
productsRouter.post("/", productsController.insertProducts)
// Read
productsRouter.get("/", productsController.getProducts)
// Update
productsRouter.put("/:id", productsController.updateProducts)
// Delete
productsRouter.delete("/:id", productsController.deleteProducts)


module.exports = productsRouter