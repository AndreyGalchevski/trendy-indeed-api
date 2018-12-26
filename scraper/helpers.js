const puppeteer = require('puppeteer');

const countryController = require('../controllers/countryController');
const technologyController = require('../controllers/technologyController');
const DailyStat = require('../models/DailyStat');

const initHeadlessBrowser = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920x1080'
    ]
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  return { browser, page };
}

const fetchJobCountText = async page => {
  let jobCountElement = await page.$('div#searchCount');
  
  if (!jobCountElement) return;

  let jobCountText = await page.evaluate(
    el => el.innerText,
    jobCountElement
  );

  return jobCountText;
}

const parseJobCount = jobCountText => {
  let splitted = jobCountText.split(' ');
  
  let jobCountString = splitted[splitted.length - 2];
  
  jobCountString = jobCountString.replace(/\u00a0/g, '');
  jobCountString = jobCountString.replace(',', '');
  jobCountString = jobCountString.replace('.', '');
  
  let jobCount;

  try {
    jobCount = Number(jobCountString);
  } catch (error) {
    jobCount = 0;
  }

  return jobCount;
}

const createUrl = (countryCode, technology) => {
  let encodedTechnology = encodeURIComponent(technology);

  let url = countryCode === 'us' 
    ? `https://www.indeed.com/jobs?q=${encodedTechnology}`
    : `https://${countryCode}.indeed.com/jobs?q=${encodedTechnology}`;

  return url;
}

const createNewDailyStat = async page => {
  const countries = await countryController.getAll();
  const technologies = await technologyController.getAll();
  let newDailyStat = new DailyStat;

  for (let i = 0; i < countries.length; i++) {
    newDailyStat.countries.push({ code: countries[i].name, technologies: [] });

    for (let j = 0; j < technologies.length; j++) {
      let url = createUrl(countries[i].code, technologies[j].name);
      await page.goto(url);
      let jobCountText = await fetchJobCountText(page);
      
      if (!jobCountText) continue;
      
      let jobCount = parseJobCount(jobCountText);
      newDailyStat.countries[i].technologies.push({ name: technologies[j].name, jobCount });
    }
  }
  await newDailyStat.save();
}

module.exports = { initHeadlessBrowser, createNewDailyStat };