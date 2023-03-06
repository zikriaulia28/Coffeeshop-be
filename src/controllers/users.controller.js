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

const insertUsers = async (req, res) => {
  try {
    const { body } = req;
    const result = await usersModel.insertUsers(body);
    res.status(201).json({
      data: result,
      msg: "Insert Success"
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
    await usersModel.deleteUsers(params);
    res.status(200).json({
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
  insertUsers,
  updateUsers,
  deleteUsers,
};