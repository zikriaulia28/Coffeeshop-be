/* eslint-disable no-undef */
module.exports = {
  host: process.env.DB_HOST,
  db: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  serverPort: process.env.SERVER_PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongoPass: process.env.MONGO_PASS,
  mongoDbName: process.env.MONGO_DBNAME,
  mongoDbHost: process.env.MONGO_HOST,
  mongoDbUser: process.env.MONGO_USER,
  cloudinaryName: process.env.CLOUD_NAME,
  cloudinaryKey: process.env.CLOUD_KEY,
  cloudinarySecret: process.env.CLOUD_SECRET,
};