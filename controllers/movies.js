const movieModel = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const { errorMessages } = require('../constants');

const getMoveis = (req, res, next) => {
  movieModel.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const createMovei = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
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
    movieId,
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
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }))
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.kind === 'CastError') {
        next(new BadRequestError(errorMessages.badRequest));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  movieModel.findById(movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessages.notFoundFilm);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new Forbidden(errorMessages.notAllow);
      }
      movieModel.findByIdAndRemove(movieId)
        .then((data) => res.status(200).send(data));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.kind === 'CastError') {
        next(new BadRequestError(errorMessages.badRequest));
      } else {
        next(err);
      }
    });
};

module.exports = { getMoveis, createMovei, deleteMovieById };
