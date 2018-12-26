const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let technologySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

let Technology = mongoose.model("Technology", technologySchema);

module.exports = Technology;
