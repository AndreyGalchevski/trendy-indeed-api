const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let dailyStatSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  countries: [{
    name: String,
    technologies: [{
      name: String,
      jobCount: Number
    }]
  }]
});

let DailyStat = mongoose.model("DailyStat", dailyStatSchema);

module.exports = DailyStat;
