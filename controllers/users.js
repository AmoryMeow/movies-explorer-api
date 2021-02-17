const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');
const { errorMessages } = require('../constants');

const { JWT_SECRET } = require('../config');

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

// возвращает информацию о пользователе (email и имя)
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  userModel.findById(userId)
    .orFail(() => {
      throw new NotFoundError(errorMessages.notFoundUser);
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.kind === 'CastError') {
        next(new BadRequestError(errorMessages.badRequest));
      } else {
        next(err);
      }
    });
};

// обновляет информацию о пользователе (email и имя)
const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError(errorMessages.badRequest);
  }
  userModel.findByIdAndUpdate(userId, { email, name }, { new: true })
    .orFail(() => {
      throw new NotFoundError(errorMessages.notFoundUser);
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.kind === 'CastError') {
        next(new BadRequestError(errorMessages.badRequest));
      } else {
        next(err);
      }
    });
};

// создаёт пользователя с переданными в теле email, password и name
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError(errorMessages.badRequest);
  }

  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({ email, name, password: hash })
        .then((data) => {
          res.status(200).send({ email: data.email, name: data.name });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new ConflictErr(errorMessages.notAllowEmail);
          }
          if (err.kind === 'ObjectId' || err.kind === 'CastError') {
            throw new BadRequestError(errorMessages.badRequest);
          } else {
            next(err);
          }
        })
        .catch(next);
    });
};

// проверяет переданные в теле почту и пароль и возвращает JWT
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers, getCurrentUser, updateCurrentUser, createUser, loginUser,
};
