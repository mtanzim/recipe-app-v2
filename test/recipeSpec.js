const request = require('supertest');
// Test Plan
// 1. Create User - x
// 2. Create Recipe - x
// 3. Read back recipe - x
// 4. Update Recipe - x
// 5. Delete Recipe - x
// 6. Create duplicate recipe - x
// 8. Delete all Recipes - x
// 9. Delete User - x
// 10. Test dangling recipes - x

module.exports = function runRecipeApiTests(app, defUser, defRecipe, baseUrl='api') {

  // import common functions
  const testCreateUser = require('./commonTest/commonUserTest')(app,baseUrl).createUser;
  const testReadUser = require('./commonTest/commonUserTest')(app,baseUrl).readUser;
  const testDeleteUser = require('./commonTest/commonUserTest')(app,baseUrl).deleteUser;

  const recipeTesterModule = require('./commonTest/commonRecipeIngTest')(app, 'recipes', ['notes', 'title'], baseUrl);

  const testCreateRecipe = recipeTesterModule.create;
  const testReadRecipe = recipeTesterModule.read;
  const testUpdateRecipe = recipeTesterModule.update;
  const testDeleteRecipe = recipeTesterModule.deleteOne;
  const testDeleteRecipeForUser = recipeTesterModule.deleteAll;
  const testRecipeDanglers = recipeTesterModule.testDanglers;

  let userId = undefined;
  let recipeId = undefined;

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
  it("Update Recipe that was created", function (done) {
    testUpdateRecipe(recipeId, {"notes":"updated from mocha"})
      .then(() => done())
      .catch(err => done(err));

  });
  it("Delete Recipe that was created", function (done) {
    testDeleteRecipe(recipeId)
      .then(() => {
        recipeId = undefined;
        done();
      })
      .catch(err => done(err));

  });
  it("CREATE duplicate recipe for User that was created", function (done) {

    testCreateRecipe(userId, defRecipe)
      .then((recipeid) => {
        recipeId = recipeid;
        // console.log(recipeId);
        done();
      })
      .catch(err => done(err));
  });
  it("CREATE duplicate recipe again for User that was created", function (done) {

    testCreateRecipe(userId, defRecipe)
      .then((recipeid) => {
        recipeId = recipeid;
        // console.log(recipeId);
        done();
      })
      .catch(err => done(err));
  });
  it("Delete Recipes for the User that was created", function (done) {
    testDeleteRecipeForUser(userId, 2)
      .then(() => {
        // userId = undefined;
        recipeId = undefined;
        done();
      })
      .catch(err => done(err));

  });
  it("CREATE duplicate recipe for User that was created for batch delete with User", function (done) {

    testCreateRecipe(userId, defRecipe)
      .then((recipeid) => {
        recipeId = recipeid;
        // console.log(recipeId);
        done();
      })
      .catch(err => done(err));
  });
  it("CREATE duplicate recipe again for User that was created for batch delete with User", function (done) {

    testCreateRecipe(userId, defRecipe)
      .then((recipeid) => {
        recipeId = recipeid;
        // console.log(recipeId);
        done();
      })
      .catch(err => done(err));
  });
  it("DELETE One User for Recipe", function (done) {
    testDeleteUser(userId)
      .then(() => done())
      .catch(err => done(err));
  });
  it("Test recipe was deleted with user", function (done) {
    testRecipeDanglers(recipeId)
      .then((res) => {
        // console.log(res);
        done();
      })
      .catch(err => done(err));
  });
};

