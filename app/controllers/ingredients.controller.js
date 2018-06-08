// const Users = require('../models/users');
const Ingredients = require('../models/ingredients');

const recipeFieldsSelect = 'title';

function createIng(recipeId, ingBody) {
  ingBody._recipe = recipeId;
  const ing = new Ingredients(ingBody);
  return ing.save();
}

function getAllIng() {
  return Ingredients
    .find({})
    .sort({ 'createdAt': -1 });
    // .populate({
    //   path: '_recipe',
    //   select: recipeFieldsSelect
    // });
}

function getIngByRecipe(id) {
  return Ingredients
    .find({ '_recipe': id })
    .sort({ 'createdAt': -1 });
    // .populate({
    //   path: '_recipe',
    //   select: recipeFieldsSelect,
    // });
}

function getOneIng(id) {
  return Ingredients
    .findOne({ _id: id });
    // .sort({ 'createdAt': -1 });
    // .populate({
    //   path: '_user',
    //   select: userFieldsSelect
    // });
}

function deleteAllIngForRecipe(id) {
  return Ingredients
    .find({ '_recipe': id })
    .sort({ 'createdAt': -1 })
    .select('_recipe')
    .then((docs) => {
      // console.log(docs);
      return Promise.all(docs.map(doc => {
        // console.log(doc);
        return doc.remove();
      }));
    });
}

function getOneIng(id) {
  return Ingredients
    .findOne({ _id: id });
    // .sort({ 'createdAt': -1 })
    // .populate({
    //   path: '_user',
    //   select: userFieldsSelect
    // });
}

function deleteOneIng(id) {
  return Ingredients.findById(id)
    .then((doc) => {
      if (!doc) {
        return Promise.reject(new Error('Document not found!'));
      }
      return doc.remove();
    })
    .catch(err => {
      return Promise.reject(err);
    });

}

function updateOneIng(id, update) {
  return Ingredients
    .findOne({ _id: id })
    .sort({ 'createdAt': -1 })
    .populate({
      path: '_recipe',
      select: recipeFieldsSelect
    })
    .then((doc) => {
      if (!doc) {
        return Promise.reject(new Error('Document not found!'));
      }
      doc = Object.assign(doc, update);
      return doc.save();
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

module.exports = {
  createIng,
  getAllIng,
  getIngByRecipe,
  deleteAllIngForRecipe,
  getOneIng,
  updateOneIng,
  deleteOneIng,
}