const NotFoundError = require('../errors/not-found-err');
const { errorMessages } = require('../constants');

const pageNotFound = () => {
  throw new NotFoundError(errorMessages.notFound);
};

module.exports = pageNotFound;
