const express = require("express");

// create express aplication
const app = express();
const PORT = 8080;

// URL = PROTOCOL://HOST:PORT/ENDPOINT 
// PROTOCOL = http, https
// HOST = ip, domain
// PORT = ketika ip ada port
// ENDPOINT = alat navigasi

app.get("/", (req, res) => {
  // res.json({
  //   msg: "Selamat Datang di Toko Kopi API",
  // })
  const path = require('path');
  res.status(200).sendFile(path.join(__dirname, "/src/html/wellcome.html"))
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
  // console.log("wellcome")
})