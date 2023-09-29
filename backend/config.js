require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3001,
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/otzModule',
  SECRET_KEY: process.env.SECRET_KEY || 'default_secret_key',
};