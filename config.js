require('dotenv').config();

const { JWT_SECRET = 'dev-secret', MONGO_URL = 'mongodb://localhost:27017/moviedb' } = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URL,
};
