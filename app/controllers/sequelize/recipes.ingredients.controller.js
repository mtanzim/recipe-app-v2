module.exports = function (_client, _selector) { 

  const Models = require('../../models/sequelize');
  
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

  function getAllForParent(parentid) {

    let query = null;

    (selector === 0)
      ? query = DBModel.findAll({ where: { UserId: parentid } })
      : query = DBModel.findAll({ where: { RecipeId: parentid } })

    return query;
  }

  function getOne(id) {
    return DBModel
      .findOne({
        where: { id: id },
        // attributes: ['_id', 'username', 'email']
      });
  };

  function deleteAllForParent(parentid) {

    return getAllForParent(parentid)
      .then( itemArr => {
        return Promise.all( itemArr.map( item => {
          return deleteOne(item.id);
        }));
      })
  }

  function create(parentid, data) {
    (selector === 0)
      ? data["UserId"] = parentid
      : data["RecipeId"] = parentid;
    return DBModel.create(data);
  };

  function updateOne(id, update) {
    return DBModel
      .findOne({
        where: { id: id },
      })
      .then(itemInstance => {
        return itemInstance.update(update);
      })
      .then((itemInstance) => {
        return getOne(itemInstance.id);
      });
  };

  function deleteOne(id) {
    return getOne(id)
      .then(item => {
        return item.destroy({ force: true });
      });
  }

  return {
    getAll,
    create,
    getAllForParent,
    deleteAllForParent,
    getOne,
    updateOne,
    deleteOne,
  };
};