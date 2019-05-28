const countryRoutes = require('./countries');
const technologyRoutes = require('./technologies');
const statRoutes = require('./stats');

module.exports = {
  '/api/countries': countryRoutes,
  '/api/technologies': technologyRoutes,
  '/api/stats': statRoutes
};
