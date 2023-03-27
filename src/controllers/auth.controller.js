const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModels = require("../models/auth.model");
const { jwtSecret } = require("../configs/environtment");
const { error } = require("../utils/response");

const login = async (req, res) => {
  try {
    // ambil email dan pwd dari body
    const { body } = req;
    // verifikasi ke db
    const result = await authModels.userVerification(body);
    // jika valid, maka buatkan jwt
    // jika tidak, maka error handling
    if (result.rows.length < 1) {
      return error(res, { status: 401, message: "Email/Password Salah" });
    }
    const { id, role_id, password, image } = result.rows[0];

    // compare password 
    const isPasswordValid = await bcrypt.compare(body.password, password);
    if (!isPasswordValid) {
      return error(res, { status: 401, message: "Email/Password Salah" });
    }
    const payload = {
      id,
      role_id,
    };
    const jwtOptions = {
      expiresIn: "5m",
    };

    // buat token
    jwt.sign(
      payload,
      jwtSecret,
      jwtOptions,
      async (err, token) => {
        if (err) throw err;
        res.status(200).json({
          message: "Selamat Datang",
          token,
          image
        });
      });
  } catch (error) {
    console.log(error);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  const { body } = req;
  try {
    // cek email duplicates
    const verificationResult = await authModels.userVerification(body);
    if (verificationResult.rows.length > 0) {
      return error(res, { status: 400, message: "Duplicate Email" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(body.pwd, 10);
    await authModels.createUsers(
      body.email,
      hashedPassword,
      body.phoneNumber
    );
    return res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    console.log(error);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const privateAccess = (req, res) => {
  const { id, email, display_name } = req.authInfo;
  res.status(200).json({
    payload: { id, email, display_name },
    message: "OK",
  });
};

const editPassword = async (req, res) => {
  // ambil user id => via user id di payload jwt token
  // cek password lama => pwd lama via body
  const { authInfo, body } = req;
  try {
    const result = await authModels.getPassword(authInfo.id);
    const passFromDb = result.rows[0].password;
    const isPasswordValid = await bcrypt.compare(body.oldPassword, passFromDb);
    if (!isPasswordValid) {
      return error(res, { status: 403, message: "Password Lama Salah" });
    }
    // jika valid, maka edit password
    //  enkripsi password baru
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await authModels.editPassword(hashedPassword, authInfo.id);
    const generateToken = () => {
      const { id, display_name } = authInfo;
      const payload = {
        id,
        display_name,
      };
      const jwtOptions = {
        expiresIn: "5m",
      };
      const token = jwt.sign(payload, jwtSecret, jwtOptions,);
      return token;
    };

    // buat token baru
    const newPayload = { id: authInfo.id };
    const newToken = generateToken(newPayload);

    res.status(200).json({
      message: "Edit Password Success",
      token: newToken,
    });
  } catch (error) {
    console.log(error);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const checkRole = async (req, res, next) => {
  // ambil user id => via user id di payload jwt token
  const { authInfo } = req;
  try {
    const result = await authModels.getUserRole(authInfo.id);
    const roleFromDb = result.rows[0].role_id;
    if (roleFromDb === 1) {
      next();
    } else {
      return error(res, { status: 403, message: "Anda tidak memiliki akses pada halaman ini" });
    }
  } catch (error) {
    console.log(error);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  register,
  privateAccess,
  editPassword,
  checkRole,
};