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
        return Promise.reject (new Error('Document not found!'));
      }
      return doc.remove();
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function updateUser(userId, update) {
  return Users.findById(userId)
    .select('+local.password')
    .exec()
    .then((doc) => {
      if (!doc) {
        return Promise.reject(new Error('Document not found!'));
      }
      doc.local = Object.assign(doc.local, update.local);
      return doc.save();
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function listUsers() {
  return Users.find({});
}

function getOneUser(id) {
  return Users.find({_id:id});
}

function getOneUserByEmail(email) {
  return Users.findOne({ 'local.email': email });
}

module.exports = {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
  getOneUser,
  getOneUserByEmail,
}