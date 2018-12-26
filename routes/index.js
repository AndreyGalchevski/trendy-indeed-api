const createCountry = require('./countries/create');
const getAllCountries = require('./countries/getAll');
const createTechnology = require('./technologies/create');
const getAllTechnologies = require('./technologies/getAll');
const getRawStats = require('./stats/getRawStats');
const getMonthlyAverages = require('./stats/getMonthlyAverages');
const getYearlyAverages = require('./stats/getYearlyAverages');

module.exports = {
  countries: {
    create: createCountry,
    getAll: getAllCountries
  },
  technologies: {
    create: createTechnology,
    getAll: getAllTechnologies
  },
  stats: {
    getRawStats,
    getMonthlyAverages,
    getYearlyAverages
  }
}