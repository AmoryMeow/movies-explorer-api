const router = require('express').Router();

const { createUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signup', createUser);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
