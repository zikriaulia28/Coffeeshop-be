const db = require("../configs/postgre");

const getProducts = (name, limit, sort) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT p.id, p.name, p.price, p.image, c.category FROM products p JOIN categories c ON p.category_id = c.id";
    if (name) {
      sql += ` WHERE (LOWER(p.name) LIKE '%${name.toLowerCase()}%') OR (p.name LIKE '%${name}%')`;
    }
    if (sort === "asc") {
      sql += " ORDER BY p.price ASC";
    } else if (sort === "desc") {
      sql += " ORDER BY p.price DESC";
    } else {
      sql += " ORDER BY p.id ASC";
    }
    if (limit) {
      sql += ` LIMIT ${limit}`;
    }
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};



const getProductsId = (params) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products WHERE id = $1";
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

const insertProducts = (data) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
    const values = [data.name, data.price];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const updateProducts = (params, body) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *";
    const values = [body.name, body.price, params.id];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const deleteProducts = (params) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
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
  getProducts,
  getProductsId,
  insertProducts,
  updateProducts,
  deleteProducts,
};