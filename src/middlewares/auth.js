const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../configs/environtment");

const checkToken = (req, res, next) => {
  // ambil token dari header 
  const bearerToken = req.header("Authorization");
  // via authorization header berbentuk bearer token
  // verifikasi token
  if (!bearerToken) return res.status(403).json({
    msg: "Silahkan Login Terlebih Dahulu"
  });
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, payload) => {
    // jika tidak, akan tolak akses
    if (err && err.name)
      return res.status(403).json({
        msg: err.message,
      });
    if (err)
      return res.status(500).json({
        msg: "Internal Server Error"
      });
    // jika valid lanjut ke controller
    // attach payload ke object request
    req.authInfo = payload;
    next();
  });
};
module.exports = {
  checkToken,
};