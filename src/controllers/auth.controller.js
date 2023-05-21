const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModels = require("../models/auth.model");
const usersModel = require("../models/users.model");
const { jwtSecret } = require("../configs/environtment");
const { error } = require("../utils/response");
const db = require("../configs/postgre");

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
      image
    };
    const jwtOptions = {
      expiresIn: "1d",
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
          image,
          id,
          role_id
        });
      });
  } catch (error) {
    console.log(error);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  const { body } = req;
  const client = await db.connect();
  try {
    const verificationResult = await authModels.userVerification(body);
    if (verificationResult.rows.length > 0) {
      return error(res, { status: 400, message: "Email has been registered" });
    }

    await client.query("BEGIN");
    const result = await usersModel.insertUsers(client, body);
    const userId = result.rows[0].id;
    await authModels.insertDetailUsers(client, userId);
    await client.query("COMMIT");
    client.release();
    res.status(200).json({
      message: "Registration successful",
    });
  } catch (err) {
    console.log(err.message);
    await client.query("ROLLBACK");
    client.release();
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

const checkRole = (req, res, next) => {
  const bearerToken = req.header("Authorization");

  if (!bearerToken) {
    return error(res, { status: "403", message: "Please login first" });
  }

  const token = bearerToken.split(" ")[1];

  jwt.verify(token, jwtSecret, (err, payload) => {
    if (err && err.name) {
      return error(res, { status: 403, message: err.message });
    }

    if (err) {
      return error(res, { status: 500, message: "Internal Server Error" });
    }

    if (payload.role_id !== 1) return error(res, { status: 403, message: "Unauthorised" });

    req.authInfo = payload.role_id;
    next();
  });
};

const createOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email);
    const generateOTP = () => {
      const digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    };

    const otp = generateOTP();
    const result = await authModels.createOTP(otp, email);
    // console.log(result.rows[0].otp);
    if (result.rows < 1) {
      return error(res, { status: 404, message: "No Such Email" });
    }
    res.status(200).json({
      data: otp,
      message: "Succesfully sent"
    });
  } catch (err) {
    console.log(err);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const forgotPwd = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const otpFromDb = await authModels.getOTP(email);
    if (otpFromDb.rows[0].otp !== otp) {
      return error(res, { status: 403, message: "Invalid OTP" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    await authModels.forgotPwd(email, hashedPwd);
    await authModels.deleteOTP(email);
    res.status(200).json({
      message: "Successfully Changed Password",
    });
  } catch (err) {
    console.log(err);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const loginFirebase = async (req, res) => {
  try {
    const { body } = req;
    const result = await authModels.loginFirebase(body.token_fcm, body.user_id);
    res.status(200).json({
      msg: "Login firebase success",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

module.exports = {
  login,
  register,
  privateAccess,
  editPassword,
  checkRole,
  createOTP,
  forgotPwd,
  loginFirebase,
};