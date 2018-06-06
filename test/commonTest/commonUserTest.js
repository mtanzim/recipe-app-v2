const expect = require('chai').expect;
const request = require('supertest');
const App = require('../../app');
const _ = require('lodash');

let config = require('../../app/config/index');
config.isTesting = true;
const app = App(config);

const createUser = function (defUser) {
  return new Promise( (resolve, reject) => {
    request(app)
      .post("/api/users/")
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


const readUser = function (userId) {
  return new Promise((resolve, reject) => {
    request(app)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) reject(new Error(res.text));
        expect(JSON.parse(res.text)._id).to.equal(userId);
        resolve();
      });
  });
};

const deleteUser = function (userId) {
  return new Promise((resolve, reject) => {
    request(app)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) reject(new Error(res.text));
        // user = JSON.parse(res.text) || undefined;
        resolve();
      });
  });
};

module.exports = {
  createUser,
  readUser,
  deleteUser,
}