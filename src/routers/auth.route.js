const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

const authRouter = Router();

// login => post request
authRouter.post("/", authController.login);
// register => post request

// edit pwd => update request 
authRouter.patch("/", authMiddleware.checkToken, authController.editPassword);

// private 
authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);

module.exports = authRouter;