var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredients = new Schema({
  _recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipes',
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

Ingredients.pre('save', function (next) {
  confirmRecipe(this._recipe, next);
});

module.exports = mongoose.model('Ingredients', Ingredients);

var Recipes = require('./recipes');

function confirmRecipe(id, next) {
  // console.log('must sure the user ref exits')
  Recipes.confirmExist(id)
    .then(recipe => {
      recipe ? next() : next(new Error("Invalid recipe supplied!"))
    })
    .catch(err => next(err));
}
