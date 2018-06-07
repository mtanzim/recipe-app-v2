const expect = require('chai').expect;
const request = require('supertest');
const App = require('../../app');
const _ = require('lodash');

let config = require('../../app/config/index');
config.isTesting = true;
const app = App(config);

const createRecipe = function (userId, recipeBody) {
  return new Promise( (resolve, reject) => {
    request(app)
      .post(`/api/recipes/${userId}`)
      .send(recipeBody)
      .expect(200)
      .end(function (err, res) {
        if (err) return reject (new Error(res.text));
        let response = (JSON.parse(res.text));
        // let createdRecipe = Object.assign({},response);
        let createdRecipe = _.pick(response, ['notes','title']);
        expect(createdRecipe).to.deep.equal(recipeBody);
        return resolve(response._id);
      });
  });
};


const readRecipe = function (recipeId, recipeBody) {
  return new Promise((resolve, reject) => {
    request(app)
      .get(`/api/recipes/single/${recipeId}`)
      .expect(200)
      .end(function (err, res) {
        if (err) return reject(new Error(res.text));
        let response = (JSON.parse(res.text));
        response = _.pick(response, ['notes', 'title']);
        expect(response).to.deep.equal(recipeBody);
        return resolve(response._id);
      });
  });
};

const updateRecipe = function (recipeId, recipeBody) {
  return new Promise((resolve, reject) => {
    request(app)
      .put(`/api/recipes/single/${recipeId}`)
      .send(recipeBody)
      .expect(200)
      .end(function (err, res) {
        if (err) return reject(new Error(res.text));
        let response = (JSON.parse(res.text));
        let updatedRecipe = _.pick(response, ['notes']);
        expect(updatedRecipe).to.deep.equal(recipeBody);
        return resolve(response._id);
      });
  });
};

const deleteRecipe = function (recipeId) {
  return new Promise((resolve, reject) => {
    request(app)
      .delete(`/api/recipes/single/${recipeId}`)
      // .send(recipeBody)
      .expect(200)
      .end(function (err, res) {
        if (err) return reject(new Error(res.text));
        let response = (JSON.parse(res.text));
        // let updatedRecipe = _.pick(response, ['notes']);
        expect(response._id).to.equal(recipeId);
        return resolve();
      });
  });
};


// deleteAllRecipesForUser
const deleteAllRecipesForUser = function (userId) {
  return new Promise((resolve, reject) => {
    request(app)
      .delete(`/api/recipes//${userId}`)
      // .send(recipeBody)
      .expect(200)
      .end(function (err, res) {
        if (err) return reject(new Error(res.text));
        let response = (JSON.parse(res.text));
        // let updatedRecipe = _.pick(response, ['notes']);
        expect(response.length).to.equal(2);
        return resolve();
      });
  });
};

module.exports = {
  createRecipe,
  readRecipe,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipesForUser,
}