const db = require("../configs/postgre");

const getProducts = (q) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT p.id, p.name, p.price, p.image, c.category_name FROM products p JOIN categories c ON p.category_id = c.id ORDER BY ";
    let order = "id ASC";
    if (q.order === "cheapest") {
      order = "price ASC";
    }
    if (q.order === "priciest") {
      order = "price DESC";
    }
    sql += order;

    const limit = parseInt(q.limit) || 5;
    const page = parseInt(q.page) || 1;
    const offset = (page - 1) * limit;

    sql += " LIMIT $1 OFFSET $2";
    const values = [limit, offset];

    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getMetaProducts = (q) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT COUNT(*) as total_data FROM products";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const totalData = parseInt(result.rows[0].total_data);
      const page = parseInt(q.page) || 1;
      const limit = parseInt(q.limit) || 5;
      const totalPage = Math.ceil(totalData / limit);
      let next = "";
      let prev = "";
      // Jika halaman saat ini lebih besar dari 1, maka halaman sebelumnya tersedia
      if (page > 1) {
        // Membuat URL yang mengarah ke halaman sebelumnya
        prev = `?page=${page - 1}&limit=${limit}`;
      }
      // Jika halaman saat ini kurang dari total halaman yang tersedia, maka halaman selanjutnya tersedia
      if (page < totalPage) {
        // Membuat URL yang mengarah ke halaman selanjutnya
        next = `?page=${page + 1}&limit=${limit}`;
      }

      const meta = {
        totalData,
        next,
        prev,
        totalPage,
      };
      resolve(meta);
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

const updateProducts = (params, body, fileLink) => {
  return new Promise((resolve, reject) => {
    const conditions = [];
    const values = [];
    let index = 1;

    if (body.name) {
      conditions.push(`name = $${index++}`);
      values.push(body.name);
    }

    if (body.price) {
      conditions.push(`price = $${index++}`);
      values.push(body.price);
    }

    if (fileLink) {
      conditions.push(`image = $${index++}`);
      values.push(fileLink);
    }

    if (conditions.length === 0) {
      return null; // tidak ada kondisi yang diberikan
    }

    const now = new Date(); // Mendapatkan waktu saat ini
    conditions.push(`updated_at = $${index++}`);
    values.push(now);

    const sql = `UPDATE products SET ${conditions.join(", ")} WHERE id = $${index} RETURNING *`;
    values.push(params.id);
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateImageProducts = (fileLink, id) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE products SET image = $1 WHERE id = $2 RETURNING *";
    db.query(sql, [fileLink, id], (err, result) => {
      if (err) return reject(err);
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
  getMetaProducts,
  updateImageProducts,
};