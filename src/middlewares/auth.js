const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../configs/environtment");
const blacklist = [];

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
    if (blacklist.includes(token)) {
      return res.status(401).json({
        msg: "Token sudah tidak Valid",
      });
    }
    // jika valid lanjut ke controller
    // attach payload ke object request
    req.authInfo = payload;
    next();
  });
};

const deleteToken = (req, res) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) return res.status(403).json({
    msg: "Silahkan Login Terlebih Dahulu"
  });
  // via authorization header berbentuk bearer token
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, payload) => {
    blacklist.push(token);
    console.log(blacklist);
    req.authInfo = payload;
    res.status(200).json({
      msg: "logout success"
    });
  });
};


module.exports = {
  checkToken,
  deleteToken
};