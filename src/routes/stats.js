const express = require('express');

const dailyStatController = require('../controllers/dailyStatController');

const router = express.Router();

router.get('/raw', async (req, res) => {
  try {
    const stats = await dailyStatController.getRawStats();
    res.send(stats);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/monthly', async (req, res) => {
  try {
    const stats = await dailyStatController.getMonthlyAverages(req.query.year, req.query.country);
    res.send(stats);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/yearly', async (req, res) => {
  try {
    const stats = await dailyStatController.getYearlyAverages(req.query.year);
    res.send(stats);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
