const { Router } = require("express");

const transactionsController = require("../controllers/transactions.controller");

const transactionsRouter = Router();

// /transactions
transactionsRouter.post("/", transactionsController.createTransaction);

module.exports = transactionsRouter;