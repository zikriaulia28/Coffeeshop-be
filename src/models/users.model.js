const db = require("../configs/postgre");

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, email, password, phone_number FROM users";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getUserDetail = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT u.email, u.phone_number, p.address, p.display_name, p.firstname, p.lastname, p.birth_day, p.image
    FROM profile p
    JOIN users u on u.id = p.user_id
    WHERE u.id = $1;`;
    const values = [params.id];
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const insertUsers = (data) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO users (email, password, phone_number, role_id) VALUES ($1, $2, $3, 2) RETURNING*";
    const values = [data.email, data.password, data.phone_number];
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateUsers = (params, body, fileLink) => {
  return new Promise((resolve, reject) => {
    const conditions = [];
    const values = [];
    let index = 1;

    if (body.display_name) {
      conditions.push(`display_name = $${index++}`);
      values.push(body.display_name);
    }

    if (body.firstname) {
      conditions.push(`firstname = $${index++}`);
      values.push(body.firstname);
    }

    if (body.lastname) {
      conditions.push(`lastname = $${index++}`);
      values.push(body.lastname);
    }

    if (body.address) {
      conditions.push(`address = $${index++}`);
      values.push(body.address);
    }

    if (body.birth_day) {
      conditions.push(`birth_day = $${index++}`);
      values.push(body.birth_day);
    }

    if (body.gender) {
      conditions.push(`gender = $${index++}`);
      values.push(body.gender);
    }

    if (fileLink) {
      conditions.push(`image = $${index++}`);
      values.push(fileLink);
    }

    if (conditions.length === 0) {
      return null; // tidak ada kondisi yang diberikan
    }

    const sql = `UPDATE profile SET ${conditions.join(", ")}  WHERE user_id = $${index} RETURNING *`;
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

const deleteUsers = (params) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
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
  getUsers,
  getUserDetail,
  insertUsers,
  updateUsers,
  deleteUsers,
};