'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredients=new Schema({
	title:String,
	qty:Number,
	unit:String
})
var Recipes = new Schema({
	title: String,
	ingredients: [Ingredients]
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
