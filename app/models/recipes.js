var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var User = require('./users');
// const findOneUser = require("../controllers/user.controller").getOneUser;



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

/* Recipes.pre('save', function (next) {
  console.log('Checking user exists');
  findOneUser(this._user)
    .then( user => {
      user ? next() : next(new Error("Invalid User supplied!"))
    })
    .catch ( err => next(err));  
}) */

Recipes.pre('remove', function (next) {
  // console.log('Deleting User');
  // console.log('Deleting all ingredients for Recipe');
  next();
  // deleteAllIngredientsForRecipe(this._id)
  //   .then(ing => next())
  //   .catch(err => next(err));
});


module.exports = mongoose.model('Recipes', Recipes);
