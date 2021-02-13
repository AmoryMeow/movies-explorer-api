const { errorMessages } = require('../constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
  } else {
    res.status(statusCode)
      .send({ message: statusCode === 500 ? errorMessages.serverError : message });
  }
  next();
};

module.exports = errorHandler;
