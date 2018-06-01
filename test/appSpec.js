require('babel-core/register');

var expect = require('chai').expect;
// var rewire = require('rewire');
// var sinon = require('sinon');
var util = require('util');
var request = require('supertest');
// var cheerio = require('cheerio');
var app = require('../app');

describe ("Recipe App", function () {
  it("GETS health check", function (done) {
    this.timeout(4000);
    request(app)
      .get("/api/health-check")
      .expect(200).end( function (err,res) {
        if (err) throw err;
        // util.log(JSON.parse(res.text));
        util.log(res.text);
        done();
      });
  });
  it("GETS Users", function (done) {
    this.timeout(4000);
    request(app)
      .get("/api/users")
      .expect(200).end(function (err, res) {
        if (err) throw err;
        // util.log(JSON.parse(res.text));
        util.log(res.text);
        done();
      });
  });
});