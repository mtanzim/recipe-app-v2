var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
import { isEmail, isLength } from 'validator';

// var path = process.cwd();
// var Recipes = require(path + '/app/models/recipes.js');
const SALT_ROUNDS = 10;

const User = new Schema({
  username: { type: String, required: [true, 'Username can not be empty'], index: { unique: true } },
  password: {
    type: String,
    required: [true, 'Password can not be empty'],
    validate: {
      validator: (v) => {
        return isLength(v, { min: 4, max: undefined });
      },
      message: 'Password is too short!',
    }
  },
  email: {
    type: String,
    required: [true, 'Email can not be empty!'],
    validate: [isEmail, 'Email is invalid']
  },
  firstname: { type: String },
  lastname: { type: String },
  description: { type: String },
},
{
  timestamps: true,
  // toObject: {
  //   transform: (doc, ret) => {
  //     delete ret.password;
  //     return ret;
  //   }
  // }
});

// pre-save hooks
User.pre('save', function (next) {
  // const saltRounds = 10; // should be moved to config file later
  bcrypt.hash(this.password, SALT_ROUNDS)
    .then(hash => {
      this.password = hash;
      next();
    });
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
}

export default mongoose.model('User', User);
