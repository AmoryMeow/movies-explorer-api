const movieModel = require('../models/movie');

const getMoveis = (req, res, next) => {
  movieModel.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const createMovei = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;

  movieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(200).send({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      thumbnail: movie.thumbnail,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }))
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { getMoveis, createMovei };
