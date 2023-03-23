const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const usersRouter = Router();
const { checkRole } = require("../controllers/auth.controller");
const memoryUpload = require("../middlewares/memoryUpload");

// Create
usersRouter.post("/", usersController.insertUsers);
// Read
usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:id", checkRole, usersController.getUserDetail);
// Update
usersRouter.patch("/:id", memoryUpload.single("image"), usersController.updateUsers);
// Delete
usersRouter.delete("/:id", checkRole, usersController.deleteUsers);

module.exports = usersRouter;