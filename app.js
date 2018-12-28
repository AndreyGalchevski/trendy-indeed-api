require('dotenv').config();

const http = require('http');
const url = require('url');

const dbConfig = require('./config/db');
const routes = require('./routes/index');
const scheduler = require('./scheduler/index');
const utils = require('./utils/index');

const port = process.env.PORT || 3000;

dbConfig.connectToDB();
scheduler.scheduleJob();

const server = http.createServer(async (req, res) => {
  utils.authenticate(req, res);

  const pathName = url.parse(req.url).pathname;
  const query = url.parse(req.url, true).query;
  
  if (!utils.isEmpty(query)) req.query = query;
  const route = routes[pathName];

  if (route) {
    route(req, res);
  } else {
    utils.sendResponse(res, 'Not Found', 404);
  }
})

server.listen(port, () => {
	console.log(`Server live at port ${port}`);
});
