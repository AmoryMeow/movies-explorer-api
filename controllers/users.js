const userModel = require('../models/user');

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

module.exports = { getUsers };
