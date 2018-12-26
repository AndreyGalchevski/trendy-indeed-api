const technologyController = require('../../controllers/technologyController');

module.exports = async (req, res) => {
  try {
    const technologyData = {
      name: req.body.name
    };
    let savedTechnology = await technologyController.create(technologyData);
    return res.status(200).send(savedTechnology);
  } catch (error) {
    return res.status(500).send('Oops! Something went wrong');
  }
};