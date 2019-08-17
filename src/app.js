require('dotenv').config();

const express = require('express');

const dbConfig = require('./config/db');
const routes = require('./routes');
const scheduler = require('./scheduler/index');
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');
const commonMiddleware = require('./middleware/commonMiddleware');

dbConfig.connectToDB();
scheduler.scheduleJob();

const app = express();

commonMiddleware.init(app);
routes.init(app);
errorHandlingMiddleware.init(app);

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Server running on port ${port}`);
