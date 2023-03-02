const express = require("express");

// create express aplication
const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
  console.log("wellcome")
})