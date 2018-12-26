require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConfig = require('./config/db');
const routeHandlers = require('./routes/index');
const scheduler = require('./scheduler/index');

const app = express();

dbConfig.connectToDB();
scheduler.scheduleJob();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/api/countries', routeHandlers.countries.create);
app.get('/api/countries', routeHandlers.countries.getAll);

app.post('/api/technologies', routeHandlers.technologies.create);
app.get('/api/technologies', routeHandlers.technologies.getAll);

app.get('/api/stats', routeHandlers.stats.getRawStats);
app.get('/api/stats/:year/:country', routeHandlers.stats.getMonthlyAverages);
app.get('/api/stats/:year', routeHandlers.stats.getYearlyAverages);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
