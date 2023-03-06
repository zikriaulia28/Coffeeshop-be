const { Pool } = require('pg');
//  client
// pool

const { host, db, dbPort, user, pass } = require("./environtment.js");

const postgre = new Pool({
  host,
  database: db,
  port: dbPort,
  user,
  password: pass,
});

module.exports = postgre;