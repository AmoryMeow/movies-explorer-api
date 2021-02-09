const userModel = require('../models/user');

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.body._id;
  userModel.findById(userId)
    .orFail(() => {
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .then((data) => res.status(200).send(data))
    .catch(next);
};

module.exports = { getUsers, getCurrentUser };
