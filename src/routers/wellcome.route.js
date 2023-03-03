const { Router } = require("express")
const path = require('path');
const wellcomeRouter = Router()

wellcomeRouter.get("/", (req, res) => {
  // res.json({
  //   msg: "Selamat Datang di Toko Kopi API",
  // })
  res.status(200).sendFile(path.join(__dirname, "../html/wellcome.html"))
})

module.exports = wellcomeRouter