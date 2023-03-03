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

const masterRouter = Router()
masterRouter.use("/", wellcomeRouter)
masterRouter.use("/users", usersRouter)
masterRouter.use("/products", productsRouter)

module.exports = masterRouter
