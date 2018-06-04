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


const defUser = require('./helpers/defaultUser');

module.exports = function runAuthApiTests(defUser) {

  let userId = null;

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
        let response = (JSON.parse(res.text));

        let createdUser = _.omit(defUser, "local.password");
        response = _.omit(response, "local.password");
        expect(response.local).to.deep.equal(createdUser.local);

        userId = response._id;
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
        done();
      });
  });
  it("Auth DELETE One User", function (done) {
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
}