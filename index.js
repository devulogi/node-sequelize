const express = require('express');
const logger = require('morgan');
require('dotenv').config({
  path: `./environments/.env.${process.env.NODE_ENV}`,
});

const { ENV_VARIABLES } = require('./config/config');

const app = express();
const env = process.env.NODE_ENV;
const { port } = ENV_VARIABLES[env];

if (env === 'production') {
  console.log('production');
  app.use(logger('combined'));
} else {
  console.log('Getting ready for development...', 'Happy hacking!');
  app.use(logger('dev'));
}

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  console.log(`Application server listening at http://localhost:${port}`);
});
