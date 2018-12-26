const countryController = require('../../controllers/countryController');

module.exports = async (req, res) => {
  try {
    let countries = await countryController.getAll();
    return res.status(200).send(countries);
  } catch (error) {
    return res.status(500).send('Oops! Something went wrong');
  }
};