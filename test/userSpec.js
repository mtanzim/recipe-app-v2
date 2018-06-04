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
};

