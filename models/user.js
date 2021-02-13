const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const BadRequestError = require('../errors/bad-request-err');

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
        return Promise.reject(new BadRequestError('Неправильный email или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadRequestError('Неправильный email или пароль'));
          }
          return user;
        });
    });
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
