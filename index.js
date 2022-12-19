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

const items = [
  {
    id: 1,
    name: 'item1',
    description: 'item1 description',
  },
  {
    id: 2,
    name: 'item2',
    description: 'item2 description',
  },
];

const itemsRoute = express.Router();
itemsRoute.get('/v1/items', (req, res) => {
  res.status(200).json({
    items: {
      count: items.length,
      data: items,
    },
  });
});
itemsRoute.get('/v1/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(item => item.id.toString() === id);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
  }
  res.status(200).json(item);
});

if (env === 'production') {
  console.log('production');
  app.use(logger('combined'));
} else {
  console.log('Getting ready for development...', 'Happy hacking!');
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

app.use('/api', itemsRoute);

app.use((req, res) => {
  const createRouteNotFoundError = () => {
    const error = new Error('Error due to route not found on the server.');
    error.code = 404;
    error.status = 404;
    error.name = 'RouteNotFoundError';
    return error;
  };
  console.error(createRouteNotFoundError());
  res.status(404).json({
    error: createRouteNotFoundError(),
    link: `http://localhost:${port}/api-docs`,
  });
});

app.listen(port, () => {
  console.log(
    'API documentation available at http://localhost:%s/api-docs',
    port,
  );
  console.log(`Application server listening at http://localhost:${port}`);
});
