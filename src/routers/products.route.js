const { Router } = require("express");
const productsController = require("../controllers/product.controller");
const productsRouter = Router();

// Create
productsRouter.post("/", productsController.insertProducts);
// Read
productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", productsController.getProductsId);
// Update
productsRouter.patch("/:id", productsController.updateProducts);
// Delete
productsRouter.delete("/:id", productsController.deleteProducts);


module.exports = productsRouter;