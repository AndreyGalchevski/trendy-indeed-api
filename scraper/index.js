const { initHeadlessBrowser, createNewDailyStat } = require('./helpers');

const start = async () => {
  const { browser, page } = await initHeadlessBrowser();

  await createNewDailyStat(page);

  await page.close();
  await browser.close();
};

module.exports = { start };
