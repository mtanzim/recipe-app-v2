const expect = require('chai').expect;
const request = require('supertest');
const App = require('../../app');
const _ = require('lodash');

let config = require('../../app/config/index');
config.isTesting = true;
const app = App(config);

module.exports = (url, picks) => {

  let tester = {};

  tester.create = function (id, body) {
    return new Promise( (resolve, reject) => {
      request(app)
        .post(`/api/${url}/${id}`)  
        .send(body)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject (new Error(res.text));
          let response = (JSON.parse(res.text));
          // let createdRecipe = Object.assign({},response);
          let createdRecipe = _.pick(response, picks);
          expect(createdRecipe).to.deep.equal(body);
          return resolve(response._id);
        });
    });
  };


  tester.read = function (id, body) {
    return new Promise((resolve, reject) => {
      request(app)
        .get(`/api/${url}/single/${id}`)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          response = _.pick(response, picks);
          expect(response).to.deep.equal(body);
          return resolve(response._id);
        });
    });
  };

  tester.readAll = function (id, len) {
    return new Promise((resolve, reject) => {
      request(app)
        .get(`/api/${url}/${id}`)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          // response = _.pick(response, picks);
          expect(response.length).to.equal(len);
          return resolve(response._id);
        });
    });
  };

  tester.update = function (id, body) {
    return new Promise((resolve, reject) => {
      request(app)
        .put(`/api/${url}/single/${id}`)
        .send(body)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          let updatedRecipe = _.pick(response, Object.keys(body));
          expect(updatedRecipe).to.deep.equal(body);
          return resolve(response._id);
        });
    });
  };

  tester.deleteOne = function (id) {
    return new Promise((resolve, reject) => {
      request(app)
        .delete(`/api/${url}/single/${id}`)
        // .send(recipeBody)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          // let updatedRecipe = _.pick(response, ['notes']);
          expect(response._id).to.equal(id);
          return resolve();
        });
    });
  };


  // deleteAllRecipesForUser
  tester.deleteAll = function (id, expectedLen) {
    return new Promise((resolve, reject) => {
      request(app)
        .delete(`/api/${url}//${id}`)
        // .send(recipeBody)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          // let updatedRecipe = _.pick(response, ['notes']);
          expect(response.length).to.equal(expectedLen);
          return resolve();
        });
    });
  };

  tester.testDanglers = function (id) {

    return new Promise((resolve, reject) => {
      request(app)
        .get(`/api/${url}//${id}`)
        // .send(recipeBody)
        .expect(500)
        .end(function (err, res) {
          if (err) return reject(err);
          return resolve(res.text);
        });
    });
    
  }

  return tester;

}

// module.exports = tester