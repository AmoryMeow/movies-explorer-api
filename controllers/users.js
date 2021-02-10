const userModel = require('../models/user');

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

// возвращает информацию о пользователе (email и имя)
const getCurrentUser = (req, res, next) => {
  const userId = req.body._id;
  userModel.findById(userId)
    .orFail(() => {
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .then((data) => res.status(200).send(data))
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
const updateCurrentUser = (req, res, next) => {
  const userId = req.body._id;
  const { email, name } = req.body;
  if (!email || !name) {
    res.status(400).send('Переданы некорректные данные');
  }
  userModel.findByIdAndUpdate(userId, { email, name }, { new: true })
    .orFail(() => {
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .then((data) => res.status(200).send(data))
    .catch(next);
};

module.exports = { getUsers, getCurrentUser, updateCurrentUser };
