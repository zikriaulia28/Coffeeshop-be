const { Router } = require("express");
const productsController = require("../controllers/product.controller");
const productsRouter = Router();

// const { singleUpload } = require("../middlewares/diskUpload");
const { checkRole } = require("../controllers/auth.controller");
const { checkToken } = require("../middlewares/auth");
const memoryUpload = require("../middlewares/memoryUpload");



// Create
// productsRouter.post("/", checkToken, checkRole, singleUpload("image"), productsController.insertProducts);
productsRouter.post("/", checkToken, checkRole, memoryUpload.single("image"), productsController.cloudUpload, productsController.insertProducts);
// Read
productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", productsController.getProductsId);
// Update
// productsRouter.patch("/:id", checkToken, checkRole, singleUpload("image"), productsController.updateProducts);
productsRouter.patch("/:id", checkToken, checkRole, memoryUpload.single("image"), productsController.updateProducts);
// Delete
productsRouter.delete("/:id", checkToken, checkRole, productsController.deleteProducts);


module.exports = productsRouter;