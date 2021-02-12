const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/moviedb' } = process.env;

const app = express();

mongoose.connect(MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});
