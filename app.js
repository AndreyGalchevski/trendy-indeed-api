require('dotenv').config();

const express = require('express');

const dbConfig = require('./config/db');
const { getRawStats, getMonthlyAverages } = require('./routes/index');
const scheduler = require('./scheduler/index');

const app = express();

const port = process.env.PORT || 3000;

dbConfig.connectToDB();
scheduler.scheduleJob();

app.use(express.static('public'));
app.get('/api/stats', getRawStats);
app.get('/api/stats/:year/:country', getMonthlyAverages);

app.listen(port, () => console.log(`Server is live on port ${port}`));
