const { Router } = require("express")
const db = require("../configs/postgre")
const usersRouter = Router()

// localhost /users
usersRouter.get("/", (req, res) => {
  db.query("SELECT user_id, email, display_name, birth_day FROM users", (err, results) => {
    if (err) {
      res.status(500).json({
        msg: "Internal Server Error",
      })
      return;
    }
    res.status(200).json({
      data: results.rows,
    })
  })
})

module.exports = usersRouter