const auth = require('basic-auth');
const compare = require('tsscmp');

const isEmpty = obj => {
  return JSON.stringify(obj) === JSON.stringify({});
};

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'Content-Type': 'application/json'
};

const sendResponse = (response, data, statusCode) => {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

const collectData = (request, callback) => {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    callback(JSON.parse(body));
  });
};

const checkPassword = (name, pass) => {
  let valid = true;

  valid = compare(name, process.env.USERNAME) && valid;
  valid = compare(pass, process.env.PASSWORD) && valid;

  return valid;
};

const authenticate = (req, res) => {
  const credentials = auth(req);
  if (
    req.method === 'POST' &&
    (!credentials || !checkPassword(credentials.name, credentials.pass))
  ) {
    sendResponse(res, 'Access Denied', 401);
  }
};

module.exports = { isEmpty, sendResponse, collectData, authenticate };
