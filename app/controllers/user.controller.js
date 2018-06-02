const Users = require('../models/users');

function createUser(userBody) {
  const user = new Users(userBody);
  return user.save();
}

function deleteUser(userId) {
  // return Users.findByIdAndRemove(userId).exec();
  return Users.findById(userId)
    .exec()
    .then((doc) => {
      if (!doc) {
        throw new Error('Document not found!');
      }
      return doc.remove();
    })
    .catch(err => {
      throw err;
    });
}

function updateUser(userId, update) {
  return Users.findById(userId)
    .select('+local.password')
    .exec()
    .then((doc) => {
      if (!doc) {
        throw new Error('Document not found!');
      }
      doc.local = Object.assign(doc.local, update.local);
      return doc.save();
    })
    .catch(err => {
      throw err;
    });
}

function listUsers() {
  return Users.find({});
}

module.exports = {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
}