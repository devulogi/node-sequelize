require('dotenv').config({
  path: `./environments/.env.${process.env.NODE_ENV}`,
});

const ENV_VARIABLES = {
  development: {
    port: process.env.PORT,
    db: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASS,
  },
};

module.exports = {
  ENV_VARIABLES,
};
