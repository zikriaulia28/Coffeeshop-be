const db = require("../configs/postgre");

const getProducts = (q) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT p.id, p.name, p.price, p.image, c.category_name as category FROM products p JOIN categories c ON p.category_id = c.id  ";
    let search = "";
    if (q.search) {
      search = `WHERE lower(p.name) LIKE lower('%${q.search}%')`;
    }
    sql += search;
    let categories = "";
    const inputCategory = parseInt(q.category);
    if (inputCategory === 1) {
      categories = `AND p.category_id = ${inputCategory}`;
    }
    if (inputCategory === 2) {
      categories = `AND p.category_id = ${inputCategory}`;
    }
    if (inputCategory === 3) {
      categories = `AND p.category_id = ${inputCategory}`;
    }
    if (inputCategory === 4) {
      categories = `AND p.category_id = ${inputCategory}`;
    }
    sql += categories;

    let order = "";
    if (q.order === "cheapest") {
      order = "ORDER BY price ASC";
    }
    if (q.order === "priciest") {
      order = "ORDER BY price DESC";
    }
    if (q.order === "latest") {
      order = "ORDER BY p.id DESC";
    }
    if (q.order === "oldest") {
      order = "ORDER BY p.id ASC";
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
    let sql = "SELECT COUNT(*) as total_data FROM products WHERE id <> 0";
    if (q.search) {
      sql += ` AND LOWER(name) LIKE LOWER('%${q.search}%')`;
    }
    if (q.category) {
      sql += ` AND category_id = ${q.category}`;
    }
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

      // generate prev link
      if (page > 1) {
        const prevQueryParams = new URLSearchParams({
          ...q,
          page: page - 1,
          limit: limit,
        });
        prev = `/products?${prevQueryParams.toString()}`;
      }

      // generate next link
      if (page < totalPage) {
        const nextQueryParams = new URLSearchParams({
          ...q,
          page: page + 1,
          limit: limit,
        });
        next = `/products?${nextQueryParams.toString()}`;
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

const insertProducts = (data, fileLink) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO products (name, price, image, category_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [data.name, data.price, fileLink, data.category_id];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const nextIdValue = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT LAST_VALUE + 1 AS next_value FROM products_id_seq";
    db.query(sql, (error, result) => {
      if (error) return reject(error);
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
  nextIdValue,
};