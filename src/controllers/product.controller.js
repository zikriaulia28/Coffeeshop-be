const productModel = require("../models/products.model");
const { uploader } = require("../utils/cloudinary");
const { error } = require("../utils/response");


const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const result = await productModel.getProducts(query);
    if (result.rows.length < 1) {
      return error(res, { status: 404, message: "Data Not Found" });
    }
    const meta = await productModel.getMetaProducts(query);
    res.status(200).json({
      data: result.rows,
      meta,
    });
    console.log(meta);
  } catch (err) {
    console.log(err.message);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const getProductsId = async (req, res) => {
  try {
    const { params } = req;
    const result = await productModel.getProductsId(params);
    if (result.rows.length < 1) {
      return error(res, { status: 404, message: "Data Not Found" });
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const insertProducts = async (req, res) => {
  try {
    const { body, file } = req;
    const valueResult = await productModel.nextIdValue();
    const nextValue = valueResult.rows[0].next_value;
    const { data, err, message } = await uploader(req, "product", nextValue);
    if (err) throw { message, err };
    if (!body || !file) return error(res, { status: 400, message: "Image Is Required" });
    const fileLink = data.secure_url;
    const result = await productModel.insertProducts(body, fileLink);
    res.status(201).json({
      data: result.rows[0],
      message: "Insert success"
    });
  } catch (err) {
    console.log(err.message);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { params, body, } = req;
    const { data, err, msg } = await uploader(req, "product", params.id);
    if (err) throw { msg, err };
    if (!body.name && !body.price) {
      return res.status(200).json({
        data: [],
        message: "Tidak ada perubahan yang dilakukan",
      });
    }
    const fileLink = data.secure_url;
    const result = await productModel.updateProducts(params, body, fileLink);
    res.status(200).json({
      data: result.rows,
      message: "Update Berhasil"
    });
  } catch (err) {
    console.log(err.message);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { params } = req;
    const result = await productModel.deleteProducts(params);
    res.status(200).json({
      message: "Delete Success",
      data: result.rows
    });
  } catch (err) {
    console.log(err.message);
    return error(res, { status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductsId,
  insertProducts,
  updateProducts,
  deleteProducts,
};