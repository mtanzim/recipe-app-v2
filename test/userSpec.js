require('babel-core/register');

var expect = require('chai').expect;
var rewire = require('rewire');
// var sinon = require('sinon');
var util = require('util');
var request = require('supertest');
// var cheerio = require('cheerio');
// var app = require('../server');

var app = rewire('../server');
app.__set__("port", process.env.TEST_PORT || 8082);
var defUser = require('./defaultUser');

describe("Recipe App", function () {

  before(function () {

  })

  let userId = null;
  // let userObj = null;


  it("GETS health check", function (done) {
    this.timeout(4000);
    request(app)
      .get("/api/health-check")
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        // util.log(JSON.parse(res.text));
        util.log(res.text);
        done();
      });
  });

  it("GETS All Users", function (done) {
    this.timeout(4000);
    request(app)
      .get("/api/users")
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        done();
      });
  });
  it("CREATE One User", function (done) {
    this.timeout(4000);
    request(app)
      .post("/api/users/")
      .send(defUser)
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        let response = (JSON.parse(res.text));
        // userObj = {...response};
        defUser.local.password = null;
        response.local.password = null;
        expect(response.local).to.deep.equal(defUser.local);
        userId = response._id;
        // console.log(userObj);
        done();
      });
  });
  it("GETS One User", function (done) {
    this.timeout(4000);
    request(app)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        // console.log(JSON.parse(res.text)[0]._id);
        // console.log(userId);
        expect(JSON.parse(res.text)[0]._id).to.equal(userId);
        done();
        // process.exit();
      });
  });
  it("Updates One User", function (done) {
    this.timeout(4000);
    request(app)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .send({ local: { email: "fromMocha@jocha.com" } })
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        // user = JSON.parse(res.text) || undefined;
        // console.log(res.text);
        expect(JSON.parse(res.text)._id).to.equal(userId);
        expect(JSON.parse(res.text).local.email).to.equal("fromMocha@jocha.com");
        done();
        // process.exit();
      });
  });
  it("Deletes One User", function (done) {
    this.timeout(4000);
    request(app)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        user = JSON.parse(res.text) || undefined;
        // console.log(user);
        done();
        // process.exit();
      });
  });


});