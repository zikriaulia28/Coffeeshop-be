// URL = PROTOCOL://HOST:PORT/ENDPOINT 
// PROTOCOL = http, https
// HOST = ip, domain
// PORT = ketika ip ada port
// ENDPOINT = alat navigasi
const { Router } = require("express");
// wellcome / 
const wellcomeRouter = require("./wellcome.route");
// users /users
const usersRouter = require("./users.route");
// products /products
const productsRouter = require("./products.route");

// transactions /transactions
const transactionsRouter = require("./transactions.route");

// promo /promo
const promoRouter = require("./promo.route");

// auth /auth
const authRouter = require("./auth.route");

const { checkToken } = require("../middlewares/auth");


const masterRouter = Router();
masterRouter.use("/users", checkToken, usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use("/transactions", checkToken, transactionsRouter);
masterRouter.use("/promo", promoRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/", checkToken, wellcomeRouter);

module.exports = masterRouter;
