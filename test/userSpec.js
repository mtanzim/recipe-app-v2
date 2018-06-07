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


module.exports = function runUserApiTests(defUser) {
  let userId = null;

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
    testCreateUser(defUser)
      .then((id) => {
        userId = id;
        done();
      })
      .catch(err => done(err));

  });
  it("READ One User", function (done) {
    testReadUser(userId)
      .then(() => done())
      .catch(err => done(err));
  });
  it("UPDATE One User", function (done) {
    let emailUpdate = "fromMoch2a@jocha.com";
    request(app)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .send({ local: { email: emailUpdate } })
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        expect(JSON.parse(res.text)._id).to.equal(userId);
        expect(JSON.parse(res.text).local.email).to.equal(emailUpdate);
        done();
      });
  });
  it("DELETE One User", function (done) {
    testDeleteUser(userId)
      .then(() => done())
      .catch(err => done(err));
  });
};

