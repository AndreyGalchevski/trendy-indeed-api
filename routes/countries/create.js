const countryController = require('../../controllers/countryController');

module.exports = async (req, res) => {
  try {
    const countryData = {
      code: req.body.code,
      name: req.body.name
    };
    let savedCountry = await countryController.create(countryData);
    return res.status(200).send(savedCountry);
  } catch (error) {
    return res.status(500).send('Oops! Something went wrong');
  }
};