require('babel-core/register');
require('dotenv').load();

const connectMongoose = require('./helpers/connectMongoose');

const testUserApi = require('./userSpec');
const testAuthApi = require('./authSpec');
const testRecipeApi = require('./recipeSpec');

const defUser = require('./helpers/defaultUser');
const defRecipe = require('./helpers/defaultRecipe');



describe("API", function () {

  this.timeout(4000);
  let apiLoops = 0;
  // let doLoops = true;

  before(function () {
    connectMongoose();
  });

  describe("API.user", function () {
    testUserApi(defUser);
  });

  describe(`API.user.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testUserApi(defUser);
    }
  });

  describe(`API.auth`, function () {
    testAuthApi(defUser);
  });

  describe(`API.auth.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testAuthApi(defUser);
    }
  });
  describe(`API.recipe`, function () {
    testRecipeApi(defUser, defRecipe);
  });

});