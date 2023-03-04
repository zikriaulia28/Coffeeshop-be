const db = require("../configs/postgre")

const getProducts = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products", (err, result) => {
      if (err) {
        reject(err);
        return
      }
      resolve(result);
    })
  })
}

const insertProducts = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`
    const values = [data.name, data.price]
    db.query(sql, values, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const updateProducts = (params, body) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *`;
    const values = [body.name, body.price, params.id];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return
      }
      resolve(result);
    });
  });
};

const deleteProducts = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM products WHERE id = $1`;
    const values = [params.id];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return
      }
      resolve(result);
    })
  })
}


module.exports = {
  getProducts,
  insertProducts,
  updateProducts,
  deleteProducts,
}