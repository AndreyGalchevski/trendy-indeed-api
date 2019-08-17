const express = require('express');

const countryController = require('../controllers/countryController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const countries = await countryController.getAll();
    res.send(countries);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
