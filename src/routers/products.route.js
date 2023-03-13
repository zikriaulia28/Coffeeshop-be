const { Router } = require("express");
const productsController = require("../controllers/product.controller");
const productsRouter = Router();

const { singleUpload } = require("../middlewares/diskUpload");
const { checkRole } = require("../controllers/auth.controller");



// Create
productsRouter.post("/", checkRole, productsController.insertProducts);
// Read
productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", productsController.getProductsId);
// Update
productsRouter.patch("/:id", checkRole, singleUpload("image"), productsController.updateProducts);
// Delete
productsRouter.delete("/:id", checkRole, productsController.deleteProducts);


module.exports = productsRouter;