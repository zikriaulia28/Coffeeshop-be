const db = require("../configs/postgre");

const getPromo = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM promo`;
    db.query(sql, (err, result) => {
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
}