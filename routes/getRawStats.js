const DailyStat = require('../models/DailyStat');

module.exports = async (req, res) => {
  try {
    let dailyStats = await DailyStat.find().sort({ date: -1 });
    return res.status(200).send(dailyStats);
  } catch (error) {
    return res.status(500).send('Oops! Something went wrong');
  }
};

