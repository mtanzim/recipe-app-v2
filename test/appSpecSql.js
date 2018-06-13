require('babel-core/register');
require('dotenv').load();

const connectMongoose = require('./helpers/connectMongoose');

const testUserApi = require('./userSpec');
const testAuthApi = require('./authSpec');
const testRecipeApi = require('./recipeSpec');
const testIngApi = require('./ingSpec');

const defUser = require('./helpers/defaultUserSql');
const defRecipe = require('./helpers/defaultRecipe');
const defIng = require('./helpers/defaultIng');

describe("API SQL", function () {

  this.timeout(4000);
  let apiLoops = 3;
  // let doLoops = true;

/*   before(function () {
    connectMongoose();
  });
 */
  describe("API.user.sql", function () {
    testUserApi(defUser, "sql");
  });

  describe(`API.user.sql.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testUserApi(defUser, "sql");
    }
  });

/*   describe(`API.auth`, function () {
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
  describe(`API.recipe.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testRecipeApi(defUser, defRecipe);
    }
  });

  describe(`API.ingredients`, function () {
    testIngApi(defUser, defRecipe, defIng);
  });
  describe(`API.ingredients.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testIngApi(defUser, defRecipe, defIng);
    }
  }); */

});