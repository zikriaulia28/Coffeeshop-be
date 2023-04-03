const { Router } = require("express");

const transactionsController = require("../controllers/transactions.controller");
const { checkToken } = require("../middlewares/auth");

const transactionsRouter = Router();

// /transactions
transactionsRouter.post("/", checkToken, transactionsController.createTransaction);
transactionsRouter.get("/", checkToken, transactionsController.getHistory);

module.exports = transactionsRouter;