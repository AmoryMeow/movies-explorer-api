const errorMessages = {
  badRequest: 'Переданы некорректные данные',
  notAllow: 'Недостаточно прав',
  notFoundFilm: 'Фильм не найден',
  notFoundUser: 'Пользователь не найден',
  notAllowEmail: 'Пользователь с указанным email уже существует',
  notAuth: 'Необходима авторизация',
  badSignin: 'Неправильный email или пароль',
  serverError: 'На сервере произошла ошибка',
};

module.exports = { errorMessages };
