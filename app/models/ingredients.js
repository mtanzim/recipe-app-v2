'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredients=new Schema({
	title:String,
	qty:String,
	unit:String
})

module.exports = mongoose.model('Ingredients', Ingredients);
