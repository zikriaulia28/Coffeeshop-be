const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const usersRouter = Router();

// Create
usersRouter.post("/", usersController.insertUsers);
// Read
usersRouter.get("/", usersController.getUsers);
// Update
usersRouter.patch("/:id", usersController.updateUsers);
// Delete
usersRouter.delete("/:id", usersController.deleteUsers);

module.exports = usersRouter;