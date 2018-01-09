'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredients=new Schema({
	title:{ type: String, maxlength:25},
	qty:{ type: Number, maxlength:25, default:0, min:0, max:9999},
	unit:{ type: String, maxlength:6},
})

module.exports = mongoose.model('Ingredients', Ingredients);
