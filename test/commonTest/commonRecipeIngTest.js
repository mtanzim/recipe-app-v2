const expect = require('chai').expect;
const request = require('supertest');

const _ = require('lodash');

module.exports = (app, url, picks, baseUrl = 'api') => {

  let tester = {};
  let responseId = null;
  baseUrl === 'api' 
    ? responseId = '_id'
    : responseId = 'id';

  tester.create = function (id, body) {
    return new Promise( (resolve, reject) => {
      request(app)
        .post(`/${baseUrl}/${url}/${id}`)  
        .send(body)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject (new Error(res.text));
          let response = (JSON.parse(res.text));
          // let createdRecipe = Object.assign({},response);
          let createdRecipe = _.pick(response, picks);
          expect(createdRecipe).to.deep.equal(body);
          return resolve(response[responseId]);
        });
    });
  };


  tester.read = function (id, body) {
    return new Promise((resolve, reject) => {
      request(app)
        .get(`/${baseUrl}/${url}/single/${id}`)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          response = _.pick(response, picks);
          expect(response).to.deep.equal(body);
          return resolve(response[responseId]);
        });
    });
  };

  tester.readAll = function (id, len) {
    return new Promise((resolve, reject) => {
      request(app)
        .get(`/${baseUrl}/${url}/${id}`)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          // response = _.pick(response, picks);
          expect(response.length).to.equal(len);
          return resolve(response[responseId]);
        });
    });
  };

  tester.update = function (id, body) {
    return new Promise((resolve, reject) => {
      request(app)
        .put(`/${baseUrl}/${url}/single/${id}`)
        .send(body)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          let updatedRecipe = _.pick(response, Object.keys(body));
          expect(updatedRecipe).to.deep.equal(body);
          return resolve(response[responseId]);
        });
    });
  };

  tester.deleteOne = function (id) {
    return new Promise((resolve, reject) => {
      request(app)
        .delete(`/${baseUrl}/${url}/single/${id}`)
        // .send(recipeBody)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          // let updatedRecipe = _.pick(response, ['notes']);
          expect(response[responseId]).to.equal(id);
          return resolve();
        });
    });
  };


  // deleteAllRecipesForUser
  tester.deleteAll = function (id, expectedLen) {
    return new Promise((resolve, reject) => {
      request(app)
        .delete(`/${baseUrl}/${url}//${id}`)
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
        .get(`/${baseUrl}/${url}//${id}`)
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