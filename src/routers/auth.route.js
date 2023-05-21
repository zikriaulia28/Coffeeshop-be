const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

const authRouter = Router();

// login => post request
authRouter.post("/", authController.login);
// register => post request
authRouter.post("/new", authController.register);
// edit pwd => update request 
authRouter.patch("/", authMiddleware.checkToken, authController.editPassword);

authRouter.patch("/otp", authController.createOTP);
authRouter.patch("/forgot", authController.forgotPwd);
authRouter.patch("/login-firebase", authController.loginFirebase);

// private 
authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);

// logout
authRouter.delete("/logout", authMiddleware.deleteToken);


module.exports = authRouter;