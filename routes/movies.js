const router = require('express').Router();

const { getMoveis, createMovei } = require('../controllers/movies');

router.get('/', getMoveis);
router.post('/', createMovei);

module.exports = router;
