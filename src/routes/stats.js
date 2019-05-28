const dailyStatController = require('../controllers/dailyStatController');
const utils = require('../utils/index');

module.exports = async (req, res) => {
  let stats;

  try {
    if (!req.query) {
      stats = await dailyStatController.getRawStats();
    } else if (req.query.year && req.query.country) {
      stats = await dailyStatController.getMonthlyAverages(req.query.year, req.query.country);
    } else if (req.query.year) {
      stats = await dailyStatController.getYearlyAverages(req.query.year);
    }

    utils.sendResponse(res, stats, 200);
  } catch (error) {
    utils.sendResponse(res, 'Internal Server Error', 500);
  }
};
