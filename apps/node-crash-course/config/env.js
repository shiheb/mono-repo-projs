require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3031,
  MONGODB_URI: process.env.MONGODB_URI,
};
