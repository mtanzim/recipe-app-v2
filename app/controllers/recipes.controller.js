// const Users = require('../models/users');
const Recipes = require('../models/recipes');


function createRecipe(userId, recipeBody) {
  recipeBody._user = userId;
  const recipe = new Recipes(recipeBody);
  return recipe.save();
}

function getRecipeByUser(userId) {
  return Recipes
    .find({ '_user': userId})
    .sort({ 'createdAt': -1 })
    .populate({
      path: '_user',
      select: 'local.email local.username'
    });
}

function getOneRecipe(recipeId) {
  return Recipes
    .findOne({ _id: recipeId})
    .sort({ 'createdAt': -1 })
    .populate({
      path: '_user',
      select: 'local.email local.username'
    });
}

function getAllRecipes() {
  return Recipes
    .find({})
    .sort({ 'createdAt': -1 })
    .populate({
      path:'_user',
      select: 'local.email local.username'
    });
}

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeByUser,
  getOneRecipe,
}