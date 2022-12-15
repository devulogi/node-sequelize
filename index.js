const express = require('express');
const logger = require('morgan');
const swagger = require('swagger-ui-express');
const yaml = require('yamljs');
require('dotenv').config({
  path: `./environments/.env.${process.env.NODE_ENV}`,
});

const { ENV_VARIABLES } = require('./config/config');
const swaggerDocument = yaml.load('./swagger.yaml');
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Hello World!',
    error: null,
    link: `http://localhost:${port}/api-docs`,
  });
});

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Application server listening at http://localhost:${port}`);
});
