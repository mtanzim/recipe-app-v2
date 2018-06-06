// require('babel-core/register');
require('dotenv').load();


// const mongoose = require('mongoose');
const expect = require('chai').expect;
const rewire = require('rewire');
const util = require('util');
const request = require('supertest');
const _ = require('lodash');

const App = require('../app');
let config = require('../app/config/index');
config.isTesting = true;
const app = App(config);

// import common functions
const testCreateUser = require('./commonTest/commonUserTest').createUser;
const testReadUser = require('./commonTest/commonUserTest').readUser;
const testDeleteUser = require('./commonTest/commonUserTest').deleteUser;

// Test Plan
// 1. Create User - x
// 2. Create Recipe
// 3. Read back recipe
// 4. Update Recipe
// 5. Delete Recipe
// 6. Create duplicate recipe
// 7. Read back all recipes
// 8. Delete all Recipes
// 9. Delete User - x

module.exports = function runRecipeApiTests(defUser) {
  let userId = undefined;

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
  // create recipe for user
  it("Create Recipe for User", function (done) {
    
    // console.log(userId);
    // expect(userId).to.not.be.undefined;
    done();

  });
  it("DELETE One User for Recipe", function (done) {
    testDeleteUser(userId)
      .then(() => done())
      .catch(err => done(err));
  });
  /*
  it("GETS health check", function (done) {
    done();
    request(app)
      .get("/api/health-check")
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        done();
      });
  });

  it("GETS All Users", function (done) {
    request(app)
      .get("/api/users")
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        done();
      });
  });
  it("CREATE One User", function (done) {
    request(app)
      .post("/api/users/")
      .send(defUser)
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        let response = (JSON.parse(res.text));

        let createdUser = _.omit(defUser,"local.password");
        response = _.omit(response, "local.password");
        expect(response.local).to.deep.equal(createdUser.local);

        // expect(response.local).to.deep.equal(defUser.local);
        userId = response._id;
        done();
      });
  });
  it("READ One User", function (done) {
    request(app)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        expect(JSON.parse(res.text)._id).to.equal(userId);
        done();
      });
  });
  it("UPDATE One User", function (done) {
    request(app)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .send({ local: { email: "fromMocha@jocha.com" } })
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        expect(JSON.parse(res.text)._id).to.equal(userId);
        expect(JSON.parse(res.text).local.email).to.equal("fromMocha@jocha.com");
        done();
      });
  });
  it("DELETE One User", function (done) {
    request(app)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        // user = JSON.parse(res.text) || undefined;
        done();
      });
  });
  */
};

