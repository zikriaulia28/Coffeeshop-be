const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

// create express aplication
const app = express();
const PORT = 8080;

app.use(cors());

// parser untuk body
app.use(express.urlencoded({ extended: false })); //form urlencoded
app.use(express.json()); // raw json
// body akan dimasukkan ke req.body

app.use(express.static("public"));

const masterRouter = require("./src/routers");
app.use(masterRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  // console.log("wellcome")
});