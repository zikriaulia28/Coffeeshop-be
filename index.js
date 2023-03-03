const express = require("express");

// create express aplication
const app = express();
const PORT = 8080;

const masterRouter = require("./src/routers")
app.use(masterRouter)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
  // console.log("wellcome")
})