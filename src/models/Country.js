const mongoose = require('mongoose');

const { Schema } = mongoose;

const countrySchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
