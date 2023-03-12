const productModel = require("../models/products.model");

const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const result = await productModel.getProducts(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product Tidak Ditemukan",
      });
      return;
    }
    const meta = await productModel.getMetaProducts(query);
    res.status(200).json({
      data: result.rows,
      meta,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
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
    const { name, price } = body;
    if (!name || !price || isNaN(price)) {
      return res.status(400).json({
        msg: "name and price are required",
      });
    }
    const result = await productModel.insertProducts(body);
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
    const result = await productModel.deleteProducts(params);
    res.status(200).json({
      msg: "Delete Success",
      data: result.rows
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