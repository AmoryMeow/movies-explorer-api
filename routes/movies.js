const router = require('express').Router();

const { getMoveis, createMovei, deleteMovieById } = require('../controllers/movies');
const { checkMovieId, checkBodyMovie } = require('../middleware/validate');

router.get('/', getMoveis);
router.post('/', checkBodyMovie, createMovei);
router.delete('/:movieId', checkMovieId, deleteMovieById);

module.exports = router;
