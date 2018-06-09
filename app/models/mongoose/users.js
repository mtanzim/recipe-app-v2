'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var path = process.cwd();


const SALT_ROUNDS = 10;

// const deleteAllRecipesForUser = require("../controllers/recipes.controller").deleteAllRecipesForUser;

var User = new Schema({
  local: {
    username: {
      required: [true, 'Username can not be empty'],
      minlength: [3, "Username too short!"],
      maxlength: [20, "Username too long!"],
      type: String,
      index: { unique: true },
    },
    email: {
      type: String,
      required: [true, 'Email can not be empty'],
      index: { unique: true },
    },
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
      // select: true,
      minlength: [4, "Password too short!"],
    }
  },
},
  {
    timestamps: true,

  });

// pre-save hooks
User.pre('save', function (next) {
  // const saltRounds = 10; // should be moved to config file later
  bcrypt.hash(this.local.password, SALT_ROUNDS)
    .then(hash => {
      this.local.password = hash;
      next();
    });
});


// remove all of the user's recipes
User.pre('remove', function (next) {
  removeRecipes(this._id, next)
});

User.statics.confirmExist = function (id) {
  return this.findOne({ '_id': id });
}


//generate a common user display name
User.virtual('displayName').get(function () {
  var nameToReturn = this.facebook.name;
  var accountType = 'fb';
  if (nameToReturn === undefined) {
    nameToReturn = this.github.displayName;
    accountType = 'git';
    if (nameToReturn === undefined) {
      nameToReturn = this.local.email;
      accountType = 'local';
    }
  }
  return { name: nameToReturn, type: accountType };
});



// generating a hash
User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS), null);
};

// checking if password is valid
User.methods.validPassword = function (password) {
  // console.log (this.get('local'));
  return bcrypt.compareSync(password, this.local.password);
};


User.methods.changePassword = function (password) {
  this.local.password = this.generateHash(password);
  //this.set(this.local.password, salt);
}

module.exports = mongoose.model('User', User);


// avoid circular referencing
var Recipes = require('./recipes.js');
function removeRecipes (id, next) {
  // console.log('removing recipes');
  Recipes.removeAllforUser(id)
    .then(recipes => next())
    .catch(err => next(err));
}