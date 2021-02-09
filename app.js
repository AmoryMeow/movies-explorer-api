const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviedb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});
