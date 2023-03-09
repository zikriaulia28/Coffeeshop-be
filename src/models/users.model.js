const db = require("../configs/postgre");

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, email, password, phone_number, created_at FROM users";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertUsers = (data) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO users (email, password, phone_number, role_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [data.email, data.password, data.phone_number, data.role_id];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateUsers = (params, body) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET email = $1, password = $2, phone_number = $3 WHERE id = $4 RETURNING *";
    const values = [body.email, body.password, body.phone_number, params.id];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const deleteUsers = (params) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    const values = [params.id];
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
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
};