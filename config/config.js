const ENV_VARIABLES = {
  development: {
    port: process.env.PORT,
    db: process.env.DB,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
  },
};

module.exports = {
  ENV_VARIABLES,
};
