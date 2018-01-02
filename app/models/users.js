'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var path = process.cwd();
var Recipes=require(path + '/app/models/recipes.js');

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   },
   recipes: { type: [Recipes.schema], default: [] }
});

module.exports = mongoose.model('User', User);
