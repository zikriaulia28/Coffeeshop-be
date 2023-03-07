const db = require("../configs/postgre");

const getHistory = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT history.id, users.email, products.name, sizes.size, products.price, deliveries.status, history.date from history 
    JOIN users on history.user_id = users.id 
    JOIN products on history.product_id = products.id
    JOIN sizes on history.size_id = sizes.id
    JOIN deliveries on history.status_id= deliveries.id`;
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertHistory = (data) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO history (user_id, product_id, size_id, status_id, date) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [data.user_id, data.product_id, data.size_id, data.status_id, data.date];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateHistory = (params, body) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE history SET product_id = $1, size_id = $2, status_id = $3 WHERE id = $4 RETURNING *";
    const values = [body.product_id, body.size_id, body.status_id, params.id];
    console.log(values);
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const deleteHistory = (params) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM history WHERE id = $1 RETURNING *";
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
  getHistory,
  insertHistory,
  updateHistory,
  deleteHistory
};