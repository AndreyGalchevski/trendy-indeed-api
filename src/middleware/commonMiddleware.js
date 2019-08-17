const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const allowedCorsUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://loving-aryabhata-61984a.netlify.com'
    : 'http://localhost:8080';

const init = app => {
  app.use(helmet());
  app.use(cors(allowedCorsUrl));
  app.use(morgan('tiny'));
};

module.exports = {
  init
};
