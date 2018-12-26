const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let countrySchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

let Country = mongoose.model("Country", countrySchema);

module.exports = Country;
