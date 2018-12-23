const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Connected to DB. Have fun!"));
};

module.exports = { connectToDB };
