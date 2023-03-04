const db = require("../configs/postgre")

const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT user_id, email, display_name, birth_day FROM users", (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  getUsers,
}
