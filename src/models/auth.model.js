const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // const sql = "SELECT id, email, password, role_id, image FROM users WHERE email=$1";
    const sql = "SELECT u.id,u.email,u.password,u.role_id,p.image FROM users u JOIN profile p on p.user_id = u.id  WHERE email=$1";
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

const createUsers = (email, password, phone_number, role_id) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO users (email, password, phone_number, role_id) VALUES ($1, $2, $3, $4) RETURNING*";
    const values = [email, password, phone_number, role_id || 2];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertDetailUsers = (client, userId) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO profile (user_id) VALUES ($1)";
    const values = [userId];
    client.query(sql, values, (error) => {
      if (error) return reject(error);
      resolve();
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

const createOTP = (otp, email) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET otp = $1 WHERE email = $2 RETURNING otp";
    const values = [otp, email];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getOTP = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT otp FROM users WHERE email = $1";
    const values = [email];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deleteOTP = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET otp = NULL WHERE email = $1";
    const values = [email];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const forgotPwd = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET password = $1 WHERE email = $2";
    const values = [password, email];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const loginFirebase = (tokenFcm, userId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "UPDATE users SET token_fcm = $1 WHERE id = $2";
    const values = [tokenFcm, userId];
    db.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};


module.exports = {
  userVerification,
  createUsers,
  insertDetailUsers,
  getPassword,
  editPassword,
  getUserRole,
  createOTP,
  getOTP,
  deleteOTP,
  forgotPwd,
  loginFirebase,
};