require('babel-core/register');

var expect = require('chai').expect;
// var rewire = require('rewire');
// var sinon = require('sinon');
var util = require('util');
var request = require('supertest');
// var cheerio = require('cheerio');
var app = require('../server');

var defUser = require('./defaultUser');

describe("Recipe App", function () {
  let user = null;
  it("GETS health check", function (done) {
    this.timeout(4000);
    request(app)
      .get("/api/health-check")
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
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
        if (err) throw err;
        // util.log(JSON.parse(res.text));
        // util.log(JSON.parse(res.text));
        done();
        // process.exit();
      });
  });
  it("GETS One User", function (done) {
    this.timeout(4000);
    request(app)
      .get("/api/users/5b126ccba844e215d0527ea7")
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        user = JSON.parse(res.text)[0] || undefined;
        console.log(user);
        done();
        // process.exit();
      });
  });
  it("Updates One User", function (done) {
    this.timeout(4000);
    request(app)
      .put("/api/users/5b126ccba844e215d0527ea7")
      .set('Accept', 'application/json')
      .send({local:{email:"fromMocha"}})
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        user = JSON.parse(res.text) || undefined;
        console.log(user);
        done();
        // process.exit();
      });
  });
  it("Deletes One User", function (done) {
    this.timeout(4000);
    request(app)
      .delete("/api/users/5b126ccba844e215d0527ea7")
      .set('Accept', 'application/json')
      // .send({ local: { email: "fromMocha" } })
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        user = JSON.parse(res.text) || undefined;
        console.log(user);
        done();
        process.exit();
      });
  });
  // it("CREATE One User", function (done) {
  //   this.timeout(4000);
  //   request(app)
  //     .post("/api/users/")
  //     .send(defUser)
  //     // .set('Accept', 'application/json')
  //     .expect(200)
  //     .end(function (err, res) {
  //       if (err) throw err;
  //       let response = (JSON.parse(res.text));
  //       userId = response.local._id;
  //       console.log(response);

  //       done();
  //       process.exit();
  //     });
  // });

});