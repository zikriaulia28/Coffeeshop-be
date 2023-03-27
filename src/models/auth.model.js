const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // const sql = "SELECT u.id, pr.display_name, u.password from users u JOIN profile pr ON pr.user_id = u.id WHERE email = $1";
    const sql = "SELECT u.id,u.email,u.password,u.role_id,p.image FROM users u JOIN profile p on p.user_id = u.id  WHERE email=$1";
    // const sql = `SELECT u.role_id, p.display_name, p.image 
    // FROM profile p
    // JOIN users u on u.id = p.user_id
    // WHERE u.id = $1`;
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

const createUsers = (email, pwd, phone) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO users (email, password, phone_number, role_id) VALUES ($1, $2, $3, 2) RETURNING *";
    const values = [email, pwd, phone];
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
  createUsers,
  getPassword,
  editPassword,
  getUserRole,
};