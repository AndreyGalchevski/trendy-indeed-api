const dailyStatController = require('../../controllers/dailyStatController');

module.exports = async (req, res) => {
  try {
    let stats = await dailyStatController.getRawStats();
    return res.status(200).send(stats);
  } catch (error) {
    return res.status(500).send('Oops! Something went wrong');
  }
};

