const expect = require('chai').expect;
const request = require('supertest');

const _ = require('lodash');


module.exports = (app, baseUrl = 'apisql') => {

  let tester = {};

/*   tester.createFriend = function (defUser) {
    return new Promise((resolve, reject) => {
      request(app)
        .post(`/${baseUrl}/friends/`)
        .send(defUser)
        .expect(200)
        .end(function (err, res) {
          if (err) return reject(new Error(res.text));
          let response = (JSON.parse(res.text));
          let createdUser = _.omit(defUser, "local.password");
          response = _.omit(response, "local.password");
          expect(response.local).to.deep.equal(createdUser.local);
          return resolve(response._id);
        });
    });
  }; */


  tester.createFriend = function (userA, userB) {
    return new Promise((resolve, reject) => {
      request(app)
        .post(`/${baseUrl}/friends/${userA}/${userB}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) reject(new Error(res.text));
          expect(JSON.parse(res.text).UserA_id).to.equal(userA);
          expect(JSON.parse(res.text).UserB_id).to.equal(userB);
          resolve(JSON.parse(res.text).friendId);
        });
    });
  };

/*   tester.deleteUser = function (userId) {
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
  }; */

  return tester;

}
