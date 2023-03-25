const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const masterRouter = require("./src/routers");

const { mongoPass, mongoDbName, mongoDbHost, mongoDbUser } = require("./src/configs/environtment");
// eslint-disable-next-line no-undef
// const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
const url = `mongodb+srv://${mongoDbUser}:${mongoPass}@${mongoDbHost}/${mongoDbName}?retryWrites=true&w=majority`;

// create express aplication
const app = express();
const PORT = 8080;

app.use(cors());

// parser untuk body
app.use(express.urlencoded({ extended: false })); //form urlencoded
app.use(express.json()); // raw json
// body akan dimasukkan ke req.body

app.use(express.static("public"));


app.use(masterRouter);

mongoose.connect(url)
  .then(() => {
    console.log("Mongo Db Connected");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
