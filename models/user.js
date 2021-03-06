const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const BadRequestError = require('../errors/bad-request-err');
const { errorMessages } = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [5, 'Длина поля должна быть больше 5 символов'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Длина поля должна быть больше 2 символов'],
    maxlength: [30, 'Длина поля должна быть менее 30 символов'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadRequestError(errorMessages.badSignin));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadRequestError(errorMessages.badSignin));
          }
          return user;
        });
    });
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
