'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredients=new Schema({
	title:{ type: String, maxlength:[25,'Ingredient title is too long!']},
	qty:{ 
		type: Number,
		default:0,
		min:[0,'Please specify a valid number over 0.'], 
		max:[9999,'Please provide a lower number.']
		
	},
	unit:{ type: String, maxlength:[25,'Unit description is too long!']},
})

module.exports = mongoose.model('Ingredients', Ingredients);
