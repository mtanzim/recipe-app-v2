const Models  = require('../../models/sequelize');

let client = null;
let DBModel = null;
let selector= null;

function create(parentid, data) {
  // let foreignKeyName = "";
  console.log(`SELECTOR IS ${selector}`);

  (selector === 0)
    ? data["UserId"] = parentid
    : data["RecipeId"] = parentid;

  console.log(data);

  return DBModel.create(data);
};

function getAll() {
  return DBModel.findAll();
};

/* function getOne (id) {
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
} */


module.exports = (_client, _selector) => {

  console.log(`SELECTOR IS ${_selector}`);
  (_selector === 0) 
    ? DBModel = Models(_client).Recipes
    : DBModel = Models(_client).Ingredients

  client = _client;
  selector = _selector;

  return {
    create,
    getAll,
    // getOne,
    // updateOne,
    // deleteOne,
  };
};