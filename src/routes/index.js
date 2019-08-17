const countryRoutes = require('./countries');
const technologyRoutes = require('./technologies');
const statRoutes = require('./stats');

const init = app => {
  app.use('/api/countries', countryRoutes);
  app.use('/api/technologies', technologyRoutes);
  app.use('/api/stats', statRoutes);
};

module.exports = {
  init
};
