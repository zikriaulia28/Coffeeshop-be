const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const usersRouter = Router();
const { checkRole } = require("../controllers/auth.controller");

// Create
usersRouter.post("/", usersController.insertUsers);
// Read
usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:id", checkRole, usersController.getUserDetail);
// Update
usersRouter.patch("/:id", checkRole, usersController.updateUsers);
// Delete
usersRouter.delete("/:id", checkRole, usersController.deleteUsers);

module.exports = usersRouter;