const mongoose = require("mongoose");
const database = require("../credentials/database.json");

const setupMongodb = () => {
  mongoose.connect(
    "mongodb+srv://vitor:adm@cluster0-fpltx.mongodb.net/koa",
    { useNewUrlParser: true }
  );

  mongoose.connection.on("connected", () => console.log("MongoDB connected!"));
};

module.exports = { setupMongodb };
