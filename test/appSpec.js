require('babel-core/register');
require('dotenv').load();

const connectMongoose = require('./helpers/connectMongoose');

const App = require('../app');
let config = require('../app/config/index');
// config.mysql.client = require('./helpers/connectSequelize')();
config.isTesting = true;
const app = App(config);

const testUserApi = require('./userSpec');
const testAuthApi = require('./authSpec');
const testRecipeApi = require('./recipeSpec');
const testIngApi = require('./ingSpec');

const defUser = require('./helpers/defaultUser');
const defRecipe = require('./helpers/defaultRecipe');
const defIng = require('./helpers/defaultIng');

describe("API Mongoose", function () {

  this.timeout(4000);
  let apiLoops = 0;
  // let doLoops = true;

  before(function () {
    connectMongoose();
  });

  describe("API.user", function () {
    testUserApi(app, defUser);
  });

  describe(`API.user.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testUserApi(app, defUser);
    }
  });

  describe(`API.auth`, function () {
    testAuthApi(app, defUser);
  });

  describe(`API.auth.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testAuthApi(app, defUser);
    }
  });
  describe(`API.recipe`, function () {
    testRecipeApi(app, defUser, defRecipe);
  });
  describe(`API.recipe.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testRecipeApi(app, defUser, defRecipe);
    }
  });

  describe(`API.ingredients`, function () {
    testIngApi(app, defUser, defRecipe, defIng);
  });
  describe(`API.ingredients.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testIngApi(app, defUser, defRecipe, defIng);
    }
  });

});