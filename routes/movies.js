const router = require('express').Router();

const { getMoveis } = require('../controllers/movies');

router.get('/', getMoveis);

module.exports = router;
