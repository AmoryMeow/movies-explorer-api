const bcrypt = require('bcryptjs');
const userModel = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');

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
      throw new NotFoundError('Пользователь не найден');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.kind === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
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
    throw new BadRequestError('Переданы некорректные данные');
  }
  userModel.findByIdAndUpdate(userId, { email, name }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.kind === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
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
    throw new BadRequestError('Переданы некорректные данные');
  }

  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({ email, name, password: hash })
        .then((data) => {
          res.status(200).send({ email: data.email, name: data.name });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new ConflictErr('Пользователь с указанным email уже существует');
          }
          if (err.kind === 'ObjectId' || err.kind === 'CastError') {
            throw new BadRequestError('Переданы некорректные данные');
          } else {
            next(err);
          }
        })
        .catch(next);
    });
};

module.exports = {
  getUsers, getCurrentUser, updateCurrentUser, createUser,
};
