const { Router } = require("express")
const historyController = require("../controllers/history.controller"
)
const historyRouter = Router()

// Create 
historyRouter.post("/", historyController.insertHistory)
// Read 
historyRouter.get("/", historyController.getHistory)
// Update
historyRouter.patch("/:id", historyController.updateHistory)
// Delete
historyRouter.delete("/:id", historyController.deleteHistory)

module.exports = historyRouter