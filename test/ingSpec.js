const request = require('supertest');
// set up app
const App = require('../app');
let config = require('../app/config/index');
config.isTesting = true;
const app = App(config);

// import common functions
const testCreateUser = require('./commonTest/commonUserTest')().createUser;
const testReadUser = require('./commonTest/commonUserTest')().readUser;
const testDeleteUser = require('./commonTest/commonUserTest')().deleteUser;

//recipe tester
const recipeTesterModule = require('./commonTest/commonRecipeIngTest')('recipes', ['notes', 'title']);
const testCreateRecipe = recipeTesterModule.create;
const testReadRecipe = recipeTesterModule.read;
const testUpdateRecipe = recipeTesterModule.update;
const testDeleteRecipe = recipeTesterModule.deleteOne;
const testDeleteRecipeForUser = recipeTesterModule.deleteAll;

// ingredients tester
const ingTesterModule = require('./commonTest/commonRecipeIngTest')('ing', ['title', 'unit', 'qty']);
const testCreateIng = ingTesterModule.create;
const testReadIng = ingTesterModule.read;
const testReadIngAll = ingTesterModule.readAll;
const testUpdateIng = ingTesterModule.update;
const testDeleteIng = ingTesterModule.deleteOne;
const testDeleteIngForRecipe = ingTesterModule.deleteAll;
const testIngDanglers = ingTesterModule.testDanglers;


// Test Plan
// 1. Create User - x
// 2. Create Recipe - x
// 3. Read back recipe - x
// 3b. Create ingredient
// 3c. Read back ingredient
// 3d. Update ingredient
// 3e. Delete ingredient
// 3f. Create duplicate ingredients
// 3g. Delete all Ingredients
// 6. Create duplicate recipe - x
// 6b. Test dangling ingredients - x
// 8. Delete all Recipes - x
// 9. Delete User - x

module.exports = function runIngApiTests(defUser, defRecipe, defIng) {
  let userId = undefined;
  let recipeId = undefined;
  let ingId = undefined;

  it("GETS health check", function (done) {
    request(app)
      .get("/api/health-check")
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        done();
      });
  });

  it("CREATE One User for Recipe", function (done) {
    testCreateUser(defUser)
      .then((id) => {
        userId = id;
        done();
      })
      .catch(err => done(err));

  });

  it("READ One User for Recipe", function (done) {
    testReadUser(userId)
      .then(() => done())
      .catch(err => done(err));
  });
  it("CREATE recipe for User that was created", function (done) {
    testCreateRecipe(userId, defRecipe)
      .then((recipeid) => {
        recipeId = recipeid;
        // console.log(recipeId);
        done();
      })
      .catch(err => done(err));
  });
  // create recipe for user
  it("Read Recipe that was created", function (done) {
    testReadRecipe(recipeId, defRecipe )
      .then(() => done())
      .catch(err => done(err));

  });

  // Start ingredient testing
  it("Create ingredient for recipe that was created", function (done) {
    testCreateIng(recipeId, defIng)
      .then((id) => {
        ingId = id;
        done();
      })
      .catch(err => done(err));

  });
  it("Read ingredient for recipe that was created", function (done) {
    testReadIng(ingId, defIng)
      .then(() => done())
      .catch(err => done(err));
  });
  it("Update ingredient for recipe that was created", function (done) {
    testUpdateIng(ingId, { "title": "pate superloaded" })
      .then(() => done())
      .catch(err => done(err));
  });
  it("Delete ingredient for recipe that was created", function (done) {
    testDeleteIng(ingId)
      .then(() => {
        ingId = undefined;
        done();
      })
      .catch(err => done(err));
  });
  it("Create duplicate ingredient for recipe that was created", function (done) {
    testCreateIng(recipeId, defIng)
      .then((id) => {
        ingId = id;
        done();
      })
      .catch(err => done(err));
  });
  it("Create duplicate ingredient again for recipe that was created", function (done) {
    testCreateIng(recipeId, defIng)
      .then((id) => {
        ingId = id;
        done();
      })
      .catch(err => done(err));
  });
  it("Read all ingredient for recipe that was created", function (done) {
    testReadIngAll(recipeId, 2)
      .then(() => done())
      .catch(err => done(err));
  });
  it("Delete all ingredient for recipe that was created to prep for batch delete", function (done) {
    testDeleteIngForRecipe(recipeId, 2)
      .then(() => {
        ingId = undefined;
        done();
      })
      .catch(err => done(err));
  });
  it("Create duplicate ingredient again for recipe that was created to prep for batch delete again", function (done) {
    testCreateIng(recipeId, defIng)
      .then((id) => {
        ingId = id;
        done();
      })
      .catch(err => done(err));
  });
  it("Create duplicate ingredient again for recipe that was created", function (done) {
    testCreateIng(recipeId, defIng)
      .then((id) => {
        ingId = id;
        done();
      })
      .catch(err => done(err));
  });

  it("Delete Recipe that was created", function (done) {
    testDeleteRecipe(recipeId)
      .then(() => {
        // ingId =undefined;
        recipeId = undefined;
        done();
      })
      .catch(err => done(err));
  });

  it("Test ingredient was deleted with recipe", function (done) {
    testIngDanglers(ingId)
      .then((res) => {
        done();
      })
      .catch(err => done(err));
  });

  it("DELETE One User for Recipe", function (done) {
    testDeleteUser(userId)
      .then(() => done())
      .catch(err => done(err));
  });
};

