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
  // const path = require('path');
  // res.status(200).sendFile(path.join(__dirname, "/src/html/wellcome.html"))
  const db = require("./src/configs/postgre")
  db.query("SELECT user_id, email, display_name, birth_day FROM users", (err, results) => {
    if (err) {
      res.status(500).json({
        msg: "Internal Server Error",
      })
      return;
    }
    res.status(200).json({
      data: results.rows,
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
  // console.log("wellcome")
})