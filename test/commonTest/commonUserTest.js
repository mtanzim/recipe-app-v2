const expect = require('chai').expect;
const request = require('supertest');

const _ = require('lodash');

// const App = require('../../app');
// let config = require('../../app/config/index');
// config.isTesting = true;
// const app = App(config);

module.exports = (app, baseUrl='api') => {

  let tester = {};

  tester.createUser = function (defUser) {
    return new Promise( (resolve, reject) => {
      request(app)
        .post(`/${baseUrl}//users/`)
        .send(defUser)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject (new Error(res.text));
          let response = (JSON.parse(res.text));
          let createdUser = _.omit(defUser, "local.password");
          response = _.omit(response, "local.password");
          expect(response.local).to.deep.equal(createdUser.local);
          return resolve(response._id);
        });
    });
  };


  tester.readUser = function (userId) {
    return new Promise((resolve, reject) => {
      request(app)
        .get(`/${baseUrl}/users/${userId}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) reject(new Error(res.text));
          expect(JSON.parse(res.text)._id).to.equal(userId);
          resolve();
        });
    });
  };

  tester.deleteUser = function (userId) {
    return new Promise((resolve, reject) => {
      request(app)
        .delete(`/${baseUrl}//users/${userId}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) reject(new Error(res.text));
          // user = JSON.parse(res.text) || undefined;
          resolve();
        });
    });
  };

  return tester;

}

/* module.exports = {
  createUser,
  readUser,
  deleteUser,
} */