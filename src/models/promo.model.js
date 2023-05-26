const db = require("../configs/postgre");

const getPromos = (info) => {
  return new Promise((resolve, reject) => {
    let showData =
      `SELECT pr.id, pr.product_id, pr.code, discount, pr.description, pr.expired_at, pd.name, pd.image, pd.price 
      FROM promos pr 
      JOIN products pd ON pd.id = pr.product_id 
      WHERE pr.id <> 1 
      ORDER BY pr.id `;
    let order = "ASC";
    if (info.order === "desc") {
      order = "DESC";
    }
    showData += order;
    db.query(showData, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const getPromoDetails = (promoId) => {
  return new Promise((resolve, reject) => {
    const showData =
      `SELECT po.id_promo, pd.name, pd.price, po.code, po.discount, pd.image, pd.id  
      FROM promos po 
      JOIN products pd 
      ON po.product_id = pd.id 
      WHERE po.id_promo = $1`;
    const values = [promoId];
    db.query(showData, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result.rows);
    });
  });
};


const addPromo = (data) => {
  return new Promise((resolve, reject) => {
    const addData =
      "INSERT INTO promos (product_id, code, discount, description, expired_at) VALUES ($1, UPPER($2), $3, $4, $5) RETURNING *";
    const values = [
      data.product_id,
      data.code,
      data.discount,
      data.description,
      data.expired_at,
    ];
    db.query(addData, values, (error, result) => {
      if (error) {
        reject(error);
      }
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

const editPromo = (promoId, data) => {
  return new Promise((resolve, reject) => {
    data.updated_at = new Date();

    let editData = "UPDATE promos SET ";
    let values = [];
    let i = 1;
    for (const [key, val] of Object.entries(data)) {
      if (key !== "id") {
        editData += `${key} = $${i}, `;
        values.push(val);
        i++;
      }
    }
    editData = editData.slice(0, -2);
    editData += ` WHERE id = $${i} RETURNING *`;
    values.push(promoId);
    console.log(editData);
    console.log(values);
    db.query(editData, values, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};



const deletePromo = (promoId) => {
  return new Promise((resolve, reject) => {
    const values = [promoId];
    db.query("DELETE FROM promos WHERE id = $1", values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


module.exports = {
  getPromos,
  addPromo,
  getPromoDetails,
  updatePromo,
  deletePromo,
  editPromo,
};