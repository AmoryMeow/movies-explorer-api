const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require("helmet");

const { requestLogger, errorLogger } = require('./middleware/logger');
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/moviedb' } = process.env;

const app = express();
app.use(helmet());

mongoose.connect(MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});
