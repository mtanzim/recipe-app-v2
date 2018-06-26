const expect = require('chai').expect;
const request = require('supertest');

const _ = require('lodash');


module.exports = (app, baseUrl = 'apisql') => {

  let tester = {};

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
  tester.removeFriend = function (userA, userB) {
    return new Promise((resolve, reject) => {
      request(app)
        .delete(`/${baseUrl}/friends/${userA}/${userB}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) reject(new Error(res.text));
          expect(JSON.parse(res.text).UserA_id).to.equal(userA);
          expect(JSON.parse(res.text).UserB_id).to.equal(userB);
          resolve(res.text);
        });
    });
  };
  tester.readRemovedFriend = function (userA, userB) {
    return new Promise((resolve, reject) => {
      request(app)
        .get(`/${baseUrl}/friends/${userA}/${userB}`)
        .set('Accept', 'application/json')
        .expect(500)
        .end(function (err, res) {
          if (err) reject(new Error(res.text));
          resolve(res.text);
        });
    });
  };
  tester.checkFriendStatus = function (friendId, userA, userB) {
    return new Promise((resolve, reject) => {
      request(app)
        .get(`/${baseUrl}/friends/${userA}/${userB}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) reject(new Error(res.text));
          expect(JSON.parse(res.text).friendId).to.equal(friendId);
          expect(JSON.parse(res.text).UserA_id).to.equal(userA);
          expect(JSON.parse(res.text).UserB_id).to.equal(userB);
          resolve(res.text);
        });
    });
  };

  tester.checkFriendList = function (userId, expLen) {
    return new Promise((resolve, reject) => {
      request(app)
        .get(`/${baseUrl}/friends/${userId}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) reject(new Error(res.text));
          expect(JSON.parse(res.text).length).to.equal(expLen);
          resolve(res.text);
        });
    });
  };


  return tester;

}
