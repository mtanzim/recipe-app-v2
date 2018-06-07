'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Recipe = require('./recipes');

var Ingredients = new Schema({
  _recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: [true, 'Ingredient must have a recipe!'],
  },
  title: { type: String, maxlength: [25, 'Ingredient title is too long!'] },
  qty: {
    type: Number,
    default: 0,
    min: [0, 'Please specify a valid number over 0.'],
    max: [9999, 'Please provide a lower number.']

  },
  unit: { type: String, maxlength: [25, 'Unit description is too long!'] },
},
  {
    timestamps: true,

  });

module.exports = mongoose.model('Ingredients', Ingredients);
