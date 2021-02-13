const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const mongoose = require('mongoose');

const checkBodyMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const checkMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).custom((value, helpers) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Некорректный id');
    }),
  }),
});

const checkBodyUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Длина поля name должна быть больше 2 символов',
        'string.max': 'Длина поля name должна быть менее 30 символов',
        'any.required': 'Поле name должно быть заполнено',
      }),
    email: Joi.string().required()
      .email().message('Некорректный email')
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
  }),
});

const checkBodySignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Длина поля name должна быть больше 2 символов',
        'string.max': 'Длина поля name должна быть менее 30 символов',
        'any.required': 'Поле name должно быть заполнено',
      }),
    email: Joi.string().required()
      .email().message('Некорректный email')
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'string.min': 'Длина поля password должна быть больше 5 символов',
        'any.required': 'Поле password должно быть заполнено',
      }),
  }),
});

const checkBodySignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .email().message('Некорректный email')
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'string.min': 'Длина поля password должна быть больше 5 символов',
        'any.required': 'Поле password должно быть заполнено',
      }),
  }),
});

module.exports = {
  checkMovieId, checkBodyMovie, checkBodyUser, checkBodySignup, checkBodySignin,
};
