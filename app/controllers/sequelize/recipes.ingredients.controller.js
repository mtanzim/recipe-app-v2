module.exports = function (_client, _selector) { 

  const Models = require('../../models/sequelize');

  // console.log(`SELECTOR IN LOADER IS ${_selector}`);
  
  let DBModel=null;
  let selector = null;
  let client = null;

  (_selector === 0) 
    ? DBModel = Models(_client).Recipes
    : DBModel = Models(_client).Ingredients

    client = _client;
    selector = _selector;

  function getAll() {
    // console.log(`SELECTOR IS ${selector}`);
    return DBModel.findAll({ order: [['createdAt', 'DESC']] });
  };

  function create(parentid, data) {
    // let foreignKeyName = "";
    // console.log(`SELECTOR IS ${selector}`);

    (selector === 0)
      ? data["UserId"] = parentid
      : data["RecipeId"] = parentid;

    console.log(data);
    // console.log(`SELECTOR in create controller is ${selector}`);

    return DBModel.create(data);
  };

  return {
    getAll,
    create,
  };
};