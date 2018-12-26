const nodeSchedule = require('node-schedule');
const scraper = require('../scraper/index');

const scheduleJob = () => {
  nodeSchedule.scheduleJob('46 7 * * *', () => {
    scraper.start();
  });
};

module.exports = { scheduleJob };
