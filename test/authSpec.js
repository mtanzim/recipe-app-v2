// require('babel-core/register');
require('dotenv').load();


// const mongoose = require('mongoose');
const expect = require('chai').expect;
const rewire = require('rewire');
const util = require('util');
const request = require('supertest');
const _ = require('lodash');

/* const App = require('../app');
let config = require('../app/config/index');
config.isTesting = true;
const app = App(config);
 */

// const defUser = require('./helpers/defaultUser');


module.exports = function runAuthApiTests(app, defUser) {

  const testDeleteUser = require('./commonTest/commonUserTest')(app).deleteUser;

  let userId = null;

  function checkUser(res) {
    let response = (JSON.parse(res.text));
    let createdUser = _.omit(defUser, "local.password");
    response = _.omit(response, "local.password");
    expect(response.local).to.deep.equal(createdUser.local);

    return response;
  }

  it("AUTH health check", function (done) {
    request(app)
      .get("/api/auth/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        done();
      });
  });

  it("AUTH signup", function (done) {
    request(app)
      .post("/api/auth/signup")
      .send(defUser.local)
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        userId = checkUser(res)._id;
        done();
      });
  });
  it("AUTH login", function (done) {
    request(app)
      .post("/api/auth/login")
      .expect(200)
      .send(defUser.local)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        checkUser(res);
        done();
      });
  });
  it("AUTH change password", function (done) {
    request(app)
      .post(`/api/auth/changepass/${userId}`)
      .expect(200)
      .send({"password":"adadadadadadadadadadadaa"})
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        checkUser(res);
        done();
      });
  });
  it("AUTH change password too short", function (done) {
    request(app)
      .post(`/api/auth/changepass/${userId}`)
      .expect(500)
      .send({ "password": "a" })
      .end(function (err, res) {
        // expect(err);
        // console.log(res.text);
        if (err) done(err);
        else done();
      });
  });
  it("Auth DELETE One User", function (done) {
    testDeleteUser(userId)
      .then(() => done())
      .catch(err => done(err));
  });
}