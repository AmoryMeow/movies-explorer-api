const router = require('express').Router();

const { getMoveis, createMovei, deleteMovieById } = require('../controllers/movies');

router.get('/', getMoveis);
router.post('/', createMovei);
router.delete('/:movieId', deleteMovieById);

module.exports = router;
