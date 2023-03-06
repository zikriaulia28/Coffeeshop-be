const productModel = require("../models/products.model");
const getProducts = async (req, res) => {
  try {
    const result = await productModel.getProducts();
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

const getProductsId = async (req, res) => {
  try {
    const { params } = req;
    const result = await productModel.getProductsId(params);
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

const insertProducts = async (req, res) => {
  try {
    const { body } = req;
    const result = await productModel.insertProducts(body);
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

const updateProducts = async (req, res) => {
  try {
    const { params, body } = req;
    const result = await productModel.updateProducts(params, body);
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

const deleteProducts = async (req, res) => {
  try {
    const { params } = req;
    await productModel.deleteProducts(params);
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
  getProducts,
  getProductsId,
  insertProducts,
  updateProducts,
  deleteProducts
};