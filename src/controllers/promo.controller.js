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

module.exports = {
  getPromo,
}