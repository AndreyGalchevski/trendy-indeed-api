const dailyStatController = require('../../controllers/dailyStatController');

module.exports = async (req, res) => {
  const year = req.params.year;
  const country = req.params.country;

  try {
    const stats = await dailyStatController.getMonthlyAverages(year, country);
    return res.json(stats);
  } catch (error) {
    console.log(error);
  }
};