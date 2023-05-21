const { Router } = require("express");

const transactionsController = require("../controllers/transactions.controller");
const { checkToken } = require("../middlewares/auth");
const { checkRole } = require("../controllers/auth.controller");

const transactionsRouter = Router();

// /transactions
transactionsRouter.post("/", checkToken, transactionsController.createTransaction);
transactionsRouter.get("/", checkToken, transactionsController.getHistory);
transactionsRouter.get("/:id", checkToken, checkRole, transactionsController.getTransactionDetail);
transactionsRouter.get(
  "/get-all-order",
  checkToken,
  checkRole,
  transactionsController.getAllOrders
);
transactionsRouter.get(
  "/get-done-order",
  checkToken,
  checkRole,
  transactionsController.getDoneOrders
);
transactionsRouter.patch(
  "/change-status-order/:id",
  checkToken,
  checkRole,
  transactionsController.changeStatusOrders
);
transactionsRouter.delete("/:id", checkToken, transactionsController.deleteTransaction);

module.exports = transactionsRouter;