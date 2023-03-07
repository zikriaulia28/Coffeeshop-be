const historyModel = require("../models/history.model");
const getHistory = async (req, res) => {
  try {
    const result = await historyModel.getHistory();
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

const insertHistory = async (req, res) => {
  try {
    const { body } = req;
    const result = await historyModel.insertHistory(body);
    res.status(201).json({
      data: result,
      msg: "Insert Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const updateHistory = async (req, res) => {
  try {
    const { params, body } = req;
    console.log(params, body);
    const result = await historyModel.updateHistory(params, body);
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

const deleteHistory = async (req, res) => {
  try {
    const { params } = req;
    const result = await historyModel.deleteHistory(params);
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
  getHistory,
  insertHistory,
  updateHistory,
  deleteHistory,
};