const path = require('path');
const wellcomePage = (req, res) => {
  // res.json({
  //   msg: "Selamat Datang di Toko Kopi API",
  // })
  res.status(200).sendFile(path.join(__dirname, "../html/wellcome.html"))
}

module.exports = {
  wellcomePage,
  // karna nama sama jadi cuma ditulis 1
}