'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var path = process.cwd();
var Ingredients = require(path + '/app/models/ingredients.js');
var Recipes = new Schema({
  title: { type: String, maxlength: [25, 'Recipe title is too long!'] },
  //ingredients: [Ingredients.schema]
  ingredients: { type: [Ingredients.schema], default: [] }
});


module.exports = mongoose.model('Recipes', Recipes);
