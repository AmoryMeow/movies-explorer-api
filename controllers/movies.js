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

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  movieModel.findById(movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        res.status(404).send('Фильм не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        res.status(409).send('Недостаточно прав');
      }
      movieModel.findByIdAndRemove(movieId)
        .then((data) => res.status(200).send(data));
    })
    .catch(next);
};

module.exports = { getMoveis, createMovei, deleteMovieById };
