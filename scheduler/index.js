const nodeSchedule = require('node-schedule');
const scraper = require('../scraper/index');

const scheduleJob = () => {
  nodeSchedule.scheduleJob('0 5 * * *', () => {
    scraper.start();
  });
};

module.exports = { scheduleJob };
