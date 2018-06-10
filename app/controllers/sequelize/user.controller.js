const Models  = require('../../models/sequelize');

let client = null;
let User = null;

//example of protecting password, and centralizing user field control through promise chaining

function checkPass(id, user) {
  return User
    .findById(id)
    .then(userInstance => {
      if (userInstance.comparePassword(user.password) ){
        return Promise.resolve(userInstance); 
      } else {
        return Promise.reject(new Error('Incorrect password!'));
      }
    }).
    then(userInstance => {
      return getOne(userInstance._id);
    })
    .catch ( err => {
      return Promise.reject(err);
    });
};

function create(user) {
  return User.create(user);
};

function getAll() {
  return User.findAll();
};

function getOne (id) {
  return User
    .findOne({
      where: { _id: id },
      attributes: ['_id', 'username', 'email' ]
    });
};

function updateOne(id, update) {
  return User
    .findOne({
      where: { _id: id },
    })
    .then( userInstance => {
      return userInstance.update(update);
    })
    .then ((user) => {
      return getOne(user._id);
    });
};

function deleteOne (id) {
  return getOne(id)
    .then ( user => {
      return user.destroy({ force: true });
    });
}


module.exports = (_client) => {
  User = Models(_client).User;
  client = _client;
  return {
    create,
    getAll,
    getOne,
    updateOne,
    checkPass,
    deleteOne,
  };
};