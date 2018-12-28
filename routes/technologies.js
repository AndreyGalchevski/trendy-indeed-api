const technologyController = require('../controllers/technologyController');
const utils = require('../utils/index');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      let technologies = await technologyController.getAll();
      utils.sendResponse(res, technologies, 200);
    } catch (error) {
      utils.sendResponse(res, 'Internal Server Error', 500);
    }
  } else if (req.method === 'POST') {
    utils.collectData(req, async data => {
      try {
        let savedTechnology = await technologyController.create(data);
        utils.sendResponse(res, savedTechnology, 200);
      } catch (error) {
        utils.sendResponse(res, 'Internal Server Error', 500);
      }
    });
  }
};