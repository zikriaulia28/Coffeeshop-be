const path = require("path");
const wellcomePage = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../html/wellcome.html"));
};

module.exports = {
  wellcomePage, // welcomePage: welcomePage
};