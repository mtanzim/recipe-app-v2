'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredients=new Schema({
	title:{ type: String, maxlength:20},
	qty:String,
	unit:String
})

module.exports = mongoose.model('Ingredients', Ingredients);
