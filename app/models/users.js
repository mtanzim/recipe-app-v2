'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var path = process.cwd();
var Recipes = require(path + '/app/models/recipes.js');

const SALT_ROUNDS = 10;

var User = new Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
    publicRepos: Number,
  },
  //Facebook login db schema
  //taken from: https://scotch.io/tutorials/easy-node-authentication-facebook#configuring-passports-facebook-strategy-configpassportjs
  facebook: {
    id: String,
    token: String,
    name: String
  },
  local: {
    username:{
      required: [true, 'Username can not be empty'], 
      type: String,
      index: { unique: true }, 
    },
    email: { 
      type:String, 
      required: [true, 'Email can not be empty'], 
      index: { unique: true }, 
    },
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
      select: false, 
    }

  },
  // recipes: { type: [Recipes.schema], default: [] }
},
{
  timestamps: true,
/*   toObject: {
    transform: (doc, ret) => {
      delete ret.local.password;
      return ret;
    }
  } */
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
  return bcrypt.compareSync(password, this.local.password);
};

User.methods.changePassword = function (password) {
  this.local.password = this.generateHash(password);
  //this.set(this.local.password, salt);
}

module.exports = mongoose.model('User', User);
