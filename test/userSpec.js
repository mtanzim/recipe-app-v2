require('babel-core/register');
require('dotenv').load();


const mongoose = require('mongoose');
const expect = require('chai').expect;
const rewire = require('rewire');
const util = require('util');
const request = require('supertest');

const App = require('../app');
let config = require('../app/config/index');
config.isTesting = true;
const app = App(config);

const defUser = require('./defaultUser');

describe("Recipe App User API", function () {
  let userId = null;
  this.timeout(4000);
  before(function () {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_URI_LOC, {
      useMongoClient: true
    }).then(
      () => {
        // util.log(`Connected to Mongo on ${mongoUri}`)
      },
      (err) => {
        util.log(err);
      }
    );
  })
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
        defUser.local.password = null;
        response.local.password = null;
        expect(response.local).to.deep.equal(defUser.local);
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
        user = JSON.parse(res.text) || undefined;
        done();
      });
  });


});