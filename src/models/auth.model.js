const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // const sql = "SELECT u.id, pr.display_name, u.password from users u JOIN profile pr ON pr.user_id = u.id WHERE email = $1";
    const sql = "SELECT id,email,password,role_id FROM users  WHERE email=$1";
    const values = [body.email];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getPassword = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT u.password From users u WHERE id = $1";
    const values = [userId];
    db.query(sql, values, (err, result) => {
      if (err)
        return reject(err);
      resolve(result);
    });
  });
};

const editPassword = (newPassword, userId) => {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const sql = "UPDATE users SET password = $1, updated_at = $2 WHERE id = $3";
    const values = [newPassword, now, userId];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getUserRole = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT email, role_id  From users WHERE id = $1";
    const values = [userId];
    db.query(sql, values, (err, result) => {
      if (err)
        return reject(err);
      resolve(result);
    });
  });
};


module.exports = {
  userVerification,
  getPassword,
  editPassword,
  getUserRole,
};