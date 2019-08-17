const express = require('express');

const technologyController = require('../controllers/technologyController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const technologies = await technologyController.getAll();
    res.send(technologies);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
