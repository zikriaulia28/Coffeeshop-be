const db = require("../configs/postgre");
const createTransaction = (client, body, userId) => {
  return new Promise((resolve, reject) => {
    const { notes, status_id, promo_id, payment_id, delivery_id } = body;
    const sql =
      "INSERT INTO transactions (user_id, notes, status_id, promo_id, payment_id, delivery_id) values ($1, $2, $3, $4, $5, $6) RETURNING id";
    const values = [userId, notes, status_id, promo_id, payment_id, delivery_id];
    client.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createDetailTransaction = (client, body, transactionId) => {
  return new Promise((resolve, reject) => {
    const { products } = body;
    let sql = "INSERT INTO transactions_products_sizes (transaction_id, product_id, size_id, qty, subtotal) VALUES";
    let values = [];
    products.forEach((product, i) => {
      const { product_id, size_id, qty, subtotal } = product;
      if (values.length) sql += ", ";
      sql += `($${1 + 5 * i}, $${2 + 5 * i}, $${3 + 5 * i}, $${4 + 5 * i}, $${5 + 5 * i})`;
      values.push(transactionId, product_id, size_id, qty, subtotal);
    });
    client.query(sql, values, (err) => {
      if (err)
        return reject(err);
      resolve();
    });
  });
};

const getTransaction = (client, transactionId) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-unused-vars
    const sql = `select u.email, pf.address, p.name as product, s.name as size, pr.code as promo, py.method as payment_method, st.name_status as transaction_status, tps.qty, tps.subtotal 
  from transactions_products_sizes tps
  join transactions t on t.id = tps.transaction_id
  join products p on p.id = tps.product_id
  join sizes s on s.id = tps.size_id
  join users u on u.id = t.user_id
  join profile pf on pf.user_id= t.user_id 
  join payment py on py.id = t.payment_id 
  join promos pr on pr.id = t.promo_id
  join status st on st.id = t.status_id WHERE t.id = $1`;
    client.query(sql, [transactionId], (err, result) => {
      if (err)
        return reject(err);
      resolve(result);
    });
  });
};

const getHistories = (info) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT DISTINCT ON (tps.transaction_id) tps.transaction_id , d.method, p.image, t.created_at, p.name, p.price, tps.product_id, tps.size_id
    FROM transactions_products_sizes tps 
    JOIN transactions t  ON t.id = tps.transaction_id 
    JOIN products p ON p.id = tps.product_id
    JOIN deliveries d ON d.id = t.delivery_id
    WHERE t.user_id = $1`;
    db.query(sqlQuery, [info.id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const deleteTransaction = (client, info) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM transactions WHERE id = $1";
    client.query(sqlQuery, [info.params.id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const getTransactionById = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT tps.transaction_id , d.method, p.image, t.created_at, p.name, p.price, tps.product_id, tps.size_id
    FROM transactions_products_sizes tps 
    JOIN transactions t  ON t.id = tps.transaction_id 
    JOIN products p ON p.id = tps.product_id
    JOIN deliveries d ON d.id = t.delivery_id
    WHERE tps.transaction_id  = $1`;
    const values = [params.id];
    db.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const getAllOrder = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT DISTINCT ON (t.id) t.id, t.status_id , d.method , t.created_at, tps.product_id , p.name , p.price , p.image 
    FROM transactions t
    JOIN deliveries d ON d.id = t.delivery_id 
    JOIN transactions_products_sizes tps  ON tps.transaction_id = t.id
    JOIN products p ON p.id = tps.product_id
    WHERE t.status_id <> 2
    ORDER BY t.id ASC`;
    db.query(sqlQuery, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const getDoneOrder = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT DISTINCT ON (t.id) t.id, t.status_id , d.method, t.created_at, tps.product_id, p.name, p.price, p.image
    FROM transactions t
    JOIN deliveries d ON d.id = t.delivery_id
    JOIN transactions_products_sizes tps  ON tps.transaction_id= t.id
    JOIN products p ON p.id = tps.product_id
    WHERE t.status_id = 2
    ORDER BY t.id desc`;
    db.query(sqlQuery, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

const changeStatusOrder = (info) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "UPDATE transactions SET status_id = 2, updated_at = NOW() WHERE id = $1 RETURNING *";
    db.query(sqlQuery, [info.id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};


module.exports = {
  createTransaction,
  createDetailTransaction,
  getTransaction,
  deleteTransaction,
  getHistories,
  getAllOrder,
  getDoneOrder,
  changeStatusOrder,
  getTransactionById,
};