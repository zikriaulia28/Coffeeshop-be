const { Router } = require("express");

const { checkToken } = require("../middlewares/auth");
const { checkRole } = require("../controllers/auth.controller");
const transactionsController = require("../controllers/transactions.controller");

const transactionsRouter = Router();

// /transactions
transactionsRouter.post("/", checkToken, checkRole, transactionsController.createTransaction);

module.exports = transactionsRouter;