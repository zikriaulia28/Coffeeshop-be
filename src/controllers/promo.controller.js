const promoModel = require("../models/promo.model");
const getPromo = async (req, res) => {
  try {
    const result = await promoModel.getPromo();
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const insertPromo = async (req, res) => {
  try {
    const { body } = req;
    const result = await promoModel.insertPromo(body);
    res.status(201).json({
      data: result.rows,
      msg: "Insert Success"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getPromoId = async (req, res) => {
  try {
    const { params } = req;
    const result = await promoModel.getPromoId(params);
    if (result.rows.length < 1) {
      res.status(404).json({
        msg: "Product not found"
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const updatePromo = async (req, res) => {
  try {
    const { params, body } = req;
    const result = await promoModel.updatePromo(params, body);
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

const deletePromo = async (req, res) => {
  try {
    const { params } = req;
    const result = await promoModel.deletePromo(params);
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
  getPromo,
  getPromoId,
  insertPromo,
  updatePromo,
  deletePromo
};