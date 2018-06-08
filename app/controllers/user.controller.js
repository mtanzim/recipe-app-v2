const Users = require('../models/users');

// note that .then() on promises already exectuces the exec()
// http://mongoosejs.com/docs/api.html#query_Query-then

function createUser(userBody) {
  const user = new Users(userBody);
  return user.save();
}

function deleteUser(userId) {
  // return Users.findByIdAndRemove(userId)//.exec();
  return Users.findById(userId)
    .select('-local.password')
    //.exec()
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

// used by auth for now
function updateUser(userId, update) {
  return Users.findById(userId)
    // .select('-local.password')
    //.exec()
    .then((doc) => {
      if (!doc) {
        return Promise.reject(new Error('Document not found!'));
      }
      doc.local = Object.assign({},doc.local, update.local);
      return doc.save();
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function updateUserForAuth(userId, update) {
  return Users.findById(userId)
    // .select('+local.password')
    //.exec()
    .then((doc) => {
      if (!doc) {
        return Promise.reject(new Error('Document not found!'));
      }
      doc.local = Object.assign({},doc.local, update.local);
      return doc.save();
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function listUsers() {
  return Users
    .find({})
    .sort({ 'createdAt': -1 })
    .select('-local.password')
    //.exec();
}

function getOneUser(id) {
  return Users.confirmExist(id);
}

// used for auth, need password
function getOneUserByEmailForAuth(email) {
  return Users
    .findOne({ 'local.email': email })
}


module.exports = {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
  getOneUser,
  getOneUserByEmailForAuth,
  updateUserForAuth,
}