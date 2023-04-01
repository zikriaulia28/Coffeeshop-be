const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const usersRouter = Router();
const { checkRole } = require("../controllers/auth.controller");
const { checkToken } = require("../middlewares/auth");
const memoryUpload = require("../middlewares/memoryUpload");

// Create
usersRouter.post("/", usersController.insertUsers);
// Read
usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:id", usersController.getUserDetail);
// Update
usersRouter.patch("/:id", checkToken, memoryUpload.single("image"), usersController.updateUsers);
// Delete
usersRouter.delete("/:id", checkRole, usersController.deleteUsers);

module.exports = usersRouter;