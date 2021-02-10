const movieModel = require('../models/movie');

const getMoveis = (req, res, next) => {
  movieModel.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

module.exports = { getMoveis };
