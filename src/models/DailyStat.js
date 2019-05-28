const mongoose = require('mongoose');

const { Schema } = mongoose;

const dailyStatSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  countries: [
    {
      name: String,
      technologies: [
        {
          name: String,
          jobCount: Number
        }
      ]
    }
  ]
});

const DailyStat = mongoose.model('DailyStat', dailyStatSchema);

module.exports = DailyStat;
