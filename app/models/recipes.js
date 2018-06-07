var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./users');

var Recipes = new Schema({
  // user is the foreign key
  _user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'Recipe must have an owner!'], 
  },
  title: { 
    type: String, 
    maxlength: [25, 'Recipe title is too long!'],
    required: [true, 'Recipe title can not be empty'],  
  },
  notes: { 
    type: String,
    maxlength: [1000, 'Comment content too long'],
  }
},
{
  timestamps: true,

});

Recipes.pre('remove', function (next) {
  // console.log('Deleting User');
  // console.log('Deleting all ingredients for Recipe');
  next();
  // deleteAllIngredientsForRecipe(this._id)
  //   .then(ing => next())
  //   .catch(err => next(err));
});


module.exports = mongoose.model('Recipes', Recipes);
