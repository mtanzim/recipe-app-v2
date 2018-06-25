require('babel-core/register');
require('dotenv').load();

// const connectMongoose = require('./helpers/connectMongoose');

const App = require('../app');
let config = require('../app/config/index');
config.mysql.client = require('./helpers/connectSequelize')();
config.isTesting = true;
const app = App(config);

const testUserApi = require('./userSpec');
// const testAuthApi = require('./authSpec');
const testRecipeApi = require('./recipeSpec');
const testIngApi = require('./ingSpec');
const testFriendsApi = require('./friendSpec');

const defUser = require('./helpers/defaultUserSql');
const defUserArray = require('./helpers/defaultUserSqlArray');
const defRecipe = require('./helpers/defaultRecipe');
const defIng = require('./helpers/defaultIng');

const baseUrl = 'apisql';
const dbType = 'sql';

describe("API SQL", function () {

  this.timeout(4000);
  let apiLoops = 0;

  describe("API.user.sql", function () {
    testUserApi(app, defUser, dbType);
  });

  describe(`API.user.sql.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testUserApi(app, defUser, dbType);
    }
  });

  describe(`API.recipe.sql`, function () {
    testRecipeApi(app, defUser, defRecipe, baseUrl);
  });
  describe(`API.recipe.sql.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testRecipeApi(app, defUser, defRecipe, baseUrl);
    }
  }); 

  describe(`API.ingredients.sql`, function () {
    testIngApi(app, defUser, defRecipe, defIng, baseUrl);
  });
  describe(`API.ingredients.sql.loop`, function () {
    for (let i = 0; i < apiLoops; i++) {
      testIngApi(app, defUser, defRecipe, defIng, baseUrl);
    }
  });


  describe(`API.friends.sql`, function () {
    testFriendsApi(app, defUserArray, dbType);
  });

});