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

// history /history
const historyRouter = require("./history.route");
// promo /promo
const promoRouter = require("./promo.route");

// auth /auth
const authRouter = require("./auth.route");

const masterRouter = Router();
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use("/transactions", transactionsRouter);
masterRouter.use("/history", historyRouter);
masterRouter.use("/promo", promoRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/", wellcomeRouter);

module.exports = masterRouter;
