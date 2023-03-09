const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT u.id, u.email, pr.display_name from users u JOIN profile pr ON pr.user_id = u.id WHERE email = $1 and password = $2";
    const values = [body.email, body.password];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
};