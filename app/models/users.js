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
	//Facebook login db schema
	//taken from: https://scotch.io/tutorials/easy-node-authentication-facebook#configuring-passports-facebook-strategy-configpassportjs
	facebook         : {
        id           : String,
        token        : String,
        name         : String
    },
   nbrClicks: {
      clicks: Number
   },
   recipes: { type: [Recipes.schema], default: [] }
});

module.exports = mongoose.model('User', User);
