const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middleware/auth');

router.post('/signup', createUser);
router.post('/signin', loginUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
