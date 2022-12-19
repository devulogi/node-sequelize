const { describe, it, expect } = require('@jest/globals');
const { ENV_VARIABLES } = require('../config/config');

describe('Test the config file', () => {
  it('should return the development environment variables', () => {
    expect(ENV_VARIABLES).toEqual({
      development: {
        port: process.env.PORT,
        db: process.env.DB_NAME,
        dbHost: process.env.DB_HOST,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASS,
      },
    });
  });
  it('should return the development environment variables', () => {
    expect(ENV_VARIABLES).toEqual({
      development: {
        port: process.env.PORT,
        db: process.env.DB_NAME,
        dbHost: process.env.DB_HOST,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASS,
      },
    });
  });
});
