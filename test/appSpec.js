require('babel-core/register');
require('dotenv').load();

const connectMongoose = require('./helpers/connectMongoose');

const testUserApi = require('./userSpec');
const testAuthApi = require('./authSpec');

const defUser = require('./helpers/defaultUser');



describe("API", function () {

  this.timeout(4000);
  let apiLoops = 100;
  let doLoops = false;

  before(function () {
    connectMongoose();
  });

  describe("API.user", function () {
    testUserApi(defUser);
  });

  describe(`API.user.loop`, function () {
    for (let i = 0; i < apiLoops && doLoops; i++) {
      testUserApi(defUser);
    }
  });

  describe(`API.auth`, function () {
    testAuthApi(defUser);
  });

  describe(`API.auth.loop`, function () {
    for (let i = 0; i < apiLoops && doLoops; i++) {
      testAuthApi(defUser);
    }
  });

});