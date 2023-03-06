// URL = PROTOCOL://HOST:PORT/ENDPOINT 
// PROTOCOL = http, https
// HOST = ip, domain
// PORT = ketika ip ada port
// ENDPOINT = alat navigasi
const { Router } = require("express");
// wellcome / 
const wellcomeRouter = require("./wellcome.route")
// users /users
const usersRouter = require("./users.route")
// products /products
const productsRouter = require("./products.route")
// history /history
const historyRouter = require("./history.route")
// promo /promo
const promoRouter = require("./promo.route")

const masterRouter = Router()
masterRouter.use("/", wellcomeRouter)
masterRouter.use("/users", usersRouter)
masterRouter.use("/products", productsRouter)
masterRouter.use("/history", historyRouter)
masterRouter.use("/promo", promoRouter)

module.exports = masterRouter
