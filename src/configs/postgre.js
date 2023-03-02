const { Pool } = require('pg');
//  client
// pool
const db = new Pool({
  host: "localhost",
  database: "toko_kopi",
  port: 5432,
  user: "zikri",
  password: "1234",
});

module.exports = db;