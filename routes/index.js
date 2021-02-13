const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middleware/auth');
const { checkBodySignup, checkBodySignin } = require('../middleware/validate');

router.post('/signup', checkBodySignup, createUser);
router.post('/signin', checkBodySignin, loginUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
