const { Router } = require("express");
const promoController = require("../controllers/promo.controller");
const promoRouter = Router();

// Create
promoRouter.post("/", promoController.insertPromo);
// Read
promoRouter.get("/", promoController.getPromo);
promoRouter.get("/:id", promoController.getPromoId);
// // Update
promoRouter.patch("/:id", promoController.updatePromo);
// // Delete
promoRouter.delete("/:id", promoController.deletePromo);


module.exports = promoRouter;