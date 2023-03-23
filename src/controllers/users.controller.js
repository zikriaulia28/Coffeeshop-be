const bcrypt = require("bcrypt");
const usersModel = require("../models/users.model");
const getUsers = async (req, res) => {
  try {
    const result = await usersModel.getUsers();
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const { params } = req;
    const result = await usersModel.getUserDetail(params);

    if (result.rows.length < 1) {
      return res.status(404).json({
        msg: "Data Not Found"
      });
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const insertUsers = async (req, res) => {
  try {
    const result = await usersModel.insertUsers({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      phone_number: req.body.phone_number,
    });
    res.status(201).json({
      data: result.rows,
      msg: "Register successful"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { params, body } = req;
    const result = await usersModel.updateUsers(params, body);
    res.status(200).json({
      data: result.rows,
      msg: "Update Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { params } = req;
    const result = await usersModel.deleteUsers(params);
    res.status(200).json({
      data: result.rows,
      msg: "Delete Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};


module.exports = {
  getUsers,
  getUserDetail,
  insertUsers,
  updateUsers,
  deleteUsers,
};