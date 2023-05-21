const { Router } = require("express");
const promoController = require("../controllers/promo.controller");
const promoRouter = Router();
const { checkToken } = require("../middlewares/auth");
const { checkRole } = require("../controllers/auth.controller");

// Create
// promoRouter.post("/", promoController.insertPromo);
promoRouter.post(
  "/",
  checkToken,
  checkRole,
  promoController.addPromo
);
// Read
promoRouter.get("/", promoController.getPromos);
promoRouter.get("/:id", promoController.getPromoDetails); // Mengubah params menjadi id
// // Update
promoRouter.patch(
  "/:id",
  checkToken,
  checkRole,
  promoController.editPromo
);
// promoRouter.patch("/:id", promoController.updatePromo);
// // Delete
promoRouter.delete(
  "/:id",
  checkToken,
  checkRole,
  promoController.deletePromo
);



module.exports = promoRouter;