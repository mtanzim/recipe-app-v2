'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var path = process.cwd();
var Ingredients=require(path + '/app/models/ingredients.js');
var Recipes = new Schema({
	user:String,
	title: String,
	//ingredients: [Ingredients.schema]
	ingredients: { type: [Ingredients.schema], default: [] }
});


//initialize the Recipes DB
/*
var newRecipe = new Recipes({
  title: 'Bahn Mi',
  ingredients: [{
  	title:'Bao',
  	qty:1,
  	unit:'u'
  	
  }]
});

newRecipe.save(function(err) {
	if (err) throw err;
	console.log('Initial Recipe saved successfully!');
});
*/

module.exports = mongoose.model('Recipes', Recipes);
