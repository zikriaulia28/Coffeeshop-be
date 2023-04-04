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
    const sql = `select u.email, pf.address, p.name as product, s.name as size, pr.code as promo, py.method as payment_method, st.name as transaction_status, tps.qty, tps.subtotal 
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

const getHistories = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT DISTINCT ON (tps.transaction_id) tps.transaction_id , d.method, p.image, t.created_at, p.name, p.price, tps.product_id  
    FROM transactions_products_sizes tps 
    JOIN transactions t  ON t.id = tps.transaction_id 
    JOIN products p ON p.id = tps.product_id
    JOIN deliveries d ON d.id = t.delivery_id
    WHERE t.user_id = $1`;
    db.query(sqlQuery, [id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};


module.exports = {
  createTransaction,
  createDetailTransaction,
  getTransaction,
  // getHistory,
  getHistories
};