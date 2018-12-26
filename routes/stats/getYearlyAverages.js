const dailyStatController = require('../../controllers/dailyStatController');

module.exports = async (req, res) => {
  const year = req.params.year;

  try {
    const stats = await dailyStatController.getYearlyAverages(year);
    return res.json(stats);
  } catch (error) {
    console.log(error);
  }
};