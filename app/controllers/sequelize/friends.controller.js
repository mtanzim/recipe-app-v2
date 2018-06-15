const Models = require('../../models/sequelize');

let client = null;
let Friend = null;


function create(userA, userB) {
  let friendBody = {
    UserA_id: userA,
    UserB_id: userB,
  }
  return Friend.create(friendBody);
};

/*
function getAll() {
  return User.findAll({ order: ['createdAt'] });
};

function getOne(id) {
  return User
    .findOne({
      where: { _id: id },
      attributes: ['_id', 'username', 'email']
    });
};

function updateOne(id, update) {
  return User
    .findOne({
      where: { _id: id },
    })
    .then(userInstance => {
      return userInstance.update(update);
    })
    .then((user) => {
      return getOne(user._id);
    });
};

function deleteOne(id) {
  return getOne(id)
    .then(user => {
      return user.destroy({ force: true });
    });
}

*/


module.exports = (_client) => {
  Friend = Models(_client).Friend;
  client = _client;
  return {
    create,
  };
};