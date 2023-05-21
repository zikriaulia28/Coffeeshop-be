const promoModel = require("../models/promo.model");

const getPromos = async (req, res) => {
  try {
    const { query } = req;
    const result = await promoModel.getPromos(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: "Data Not Found... please don't do it again",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};

const getPromoDetails = async (req, res) => {
  try {
    const { id } = req.params; // Mengambil id langsung dari req.params
    const result = await promoModel.getPromoDetails(id); // Mengirimkan id sebagai argumen
    if (result.length === 0) { // Menggunakan result.length daripada result.rows.length
      res.status(404).json({
        msg: `Data ID ${id} Not Found... please don't do it again`,
      });
      return;
    }
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};


const addPromo = async (req, res) => {
  try {
    const { body } = req;
    const result = await promoModel.addPromo(body);
    res.status(201).json({
      msg: "Add Data Promo Success...",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error...",
      data: err.detail,
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

const editPromo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await promoModel.editPromo(id, req.body);
    if (result.rowCount === 0) {
      res.status(404).json({
        msg: `Edit Fail... ID ${id} Not Found...`,
      });
      return;
    }
    res.status(200).json({
      msg: "Edit Data Promo Success...",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error...",
      data: err.detail,
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
    const promoId = req.params.id;
    const result = await promoModel.deletePromo(promoId);
    if (result.rowCount === 0) {
      res.status(404).json({
        msg: `Data ID ${promoId} Not Found... please don't do it again!`,
      });
    } else {
      res.status(200).json({
        msg: `Delete ID ${promoId} Data Promo Success...`,
        data: result.rows,
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};


module.exports = {
  getPromos,
  getPromoDetails,
  getPromoId,
  addPromo,
  updatePromo,
  deletePromo,
  editPromo,
};