const { mongoPass } = require("../configs/environment");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://admin-kopi:${mongoPass}@kopi-toko.turnmud.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = {
  client,
  error: client.db("log").collection("error")
};