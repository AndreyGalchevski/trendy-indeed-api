const mongoose = require('mongoose');

const { Schema } = mongoose;

const technologySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;
