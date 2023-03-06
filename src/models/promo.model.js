const db = require("../configs/postgre");

const getPromo = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT p.id, pr.name , p.description, p.promo_code, p.discount, p.date_start, p.date_end FROM promo p JOIN products pr ON p.product_id = pr.id ORDER BY p.discount ASC LIMIT 3";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getPromoId = (params) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM promo WHERE id = $1";
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

const insertPromo = (data) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO promo (product_id, description, promo_code, discount, date_start , date_end) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [data.product_id, data.description, data.promo_code, data.discount, data.date_start, data.date_end];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const updatePromo = (params, body) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE promo SET product_id = $1, discount = $2, date_start = $3, date_end = $4 WHERE id = $5 RETURNING *";
    const values = [body.product_id, body.discount, body.date_start, body.date_end, params.id];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const deletePromo = (params) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM promo WHERE id = $1";
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
  getPromo,
  getPromoId,
  insertPromo,
  updatePromo,
  deletePromo,
};