var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const findUser = require("../controllers/user.controller").getOneUser;

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

Recipes.statics.confirmExist = function (id) {
  // console.log(id);
  return this.findOne({ '_id': id });
}

Recipes.statics.removeAllforUser  = function (userId) {
  return this
    .find({ '_user': userId })
    .sort({ 'createdAt': -1 })
    .select('_user')
    .then((docs) => {
      // console.log(docs);
      return Promise.all(docs.map(doc => {
        // console.log('REMOVING!')
        // console.log(doc);
        return doc.remove();
      }));
    });
}

Recipes.pre('save', function (next) {
  confirmUser(this._user, next);
});

Recipes.pre('remove', function (next) {

  removeAllingredients(this._id, next);
  // console.log('Deleting User');
  // console.log('Deleting all ingredients for Recipe');
  next();
  // deleteAllIngredientsForRecipe(this._id)
  //   .then(ing => next())
  //   .catch(err => next(err));
});


module.exports = mongoose.model('Recipes', Recipes);

var User = require('./users');
function confirmUser (userid, next) {
  // console.log('must sure the user ref exits')
  User.confirmExist(userid)
    .then(user => {
      // console.log(user);
      user ? next() : next(new Error("Invalid user supplied!"))
    })
    .catch(err => next(err))
}

var Ingredients = require('./ingredients');
function removeAllingredients(recipeId, next) {
  Ingredients.removeAllforRecipe(recipeId)
    .then(ing => next())
    .catch(err => next(err));
   
 };