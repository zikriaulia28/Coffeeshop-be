const { Router } = require("express");
const productsController = require("../controllers/product.controller");
const productsRouter = Router();

const { singleUpload } = require("../middlewares/diskUpload");
const { checkRole } = require("../controllers/auth.controller");
const { checkToken } = require("../middlewares/auth");



// Create
productsRouter.post("/", checkToken, checkRole, singleUpload("image"), productsController.insertProducts);
// Read
productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", productsController.getProductsId);
// Update
productsRouter.patch("/:id", checkToken, checkRole, singleUpload("image"), productsController.updateProducts);
// Delete
productsRouter.delete("/:id", checkToken, checkRole, productsController.deleteProducts);


module.exports = productsRouter;