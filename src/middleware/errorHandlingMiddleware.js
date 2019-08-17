const createError = require('http-errors');

const init = app => {
  app.use((err, req, res, next) => {
    next(createError(500, 'Something went terribly wrong'));
  });

  app.use((req, res, next) => {
    next(createError(404, 'Resource Not Found'));
  });
};

module.exports = {
  init
};
