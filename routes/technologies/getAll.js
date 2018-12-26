const technologyController = require('../../controllers/technologyController');

module.exports = async (req, res) => {
  try {
    let technologies = await technologyController.getAll();
    return res.status(200).send(technologies);
  } catch (error) {
    return res.status(500).send('Oops! Something went wrong');
  }
};