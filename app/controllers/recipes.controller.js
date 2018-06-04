// const Users = require('../models/users');
const Recipes = require('../models/recipes');


function createRecipe(userId, recipeBody) {
  recipeBody._user = userId;
  const recipe = new Recipes(recipeBody);
  return recipe.save();
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
}