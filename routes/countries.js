const countryController = require('../controllers/countryController');
const utils = require('../utils/index');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      let countries = await countryController.getAll();
      utils.sendResponse(res, countries, 200);
    } catch (error) {
      utils.sendResponse(res, 'Internal Server Error', 500);
    }
  } else if (req.method === 'POST') {
    utils.collectData(req, async data => {
      try {
        let savedCountry = await countryController.create(data);
        utils.sendResponse(res, savedCountry, 200);
      } catch (error) {
        utils.sendResponse(res, 'Internal Server Error', 500);
      }
    });
  }
};