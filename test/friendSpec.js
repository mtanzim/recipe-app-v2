// require('babel-core/register');
require('dotenv').load();

const expect = require('chai').expect;
const request = require('supertest');
const _ = require('lodash');


module.exports = function runUserApiTests(app, defUserArray, dbType = "mongo") {

  let baseUrl = null;
  let userUpdate = null;
  let emailUpdate = "fromMoch2a@jocha.com";
  // let defUser =defUserArray[0];

  (dbType === "mongo")
    ? baseUrl = 'api'
    : baseUrl = 'apisql';

  (dbType === "mongo")
    ? userUpdate = { local: { email: emailUpdate } }
    : userUpdate = { email: emailUpdate };

  // import common functions
  const testCreateUser = require('./commonTest/commonUserTest')(app, baseUrl).createUser;
  const testReadUser = require('./commonTest/commonUserTest')(app, baseUrl).readUser;
  const testDeleteUser = require('./commonTest/commonUserTest')(app, baseUrl).deleteUser;
  const testCreateFriend = require('./commonTest/commonFriendTest')(app).createFriend;
  const checkFriendStatus = require('./commonTest/commonFriendTest')(app).checkFriendStatus;
  const checkFriendList = require('./commonTest/commonFriendTest')(app).checkFriendList;
  const removeFriend = require('./commonTest/commonFriendTest')(app).removeFriend;
  const readRemovedFriend = require('./commonTest/commonFriendTest')(app).readRemovedFriend;

  let userIdArr = [];
  let friendPairDel = [0,1];
  let userToIdxDel = 0;
  let removedUserId = null; 
  let friendObj = {};

  // userIdArr = ['a62efe11-4faf-4a0a-bbc2-751c56375104',
  //   '2b4ecbfe-a837-4a52-a854-ed0ffb40025c',
  //   'bf760000-bb3f-4d95-ab32-685a853df1e7'];

  it("GETS health check", function (done) {
    request(app)
      .get(`/${baseUrl}/health-check`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        done();
      });
  });
  it("GETS All Users", function (done) {
    request(app)
      .get(`/${baseUrl}/users`)
      .expect(200)
      .end(function (err, res) {
        if (err) done(new Error(res.text));
        done();
      });
  });

  
  it("CREATE An Array of users", function (done) {
    Promise.all (
      defUserArray.map ( defUser => {
        return testCreateUser(defUser)
          .then((id) => {
            userIdArr.push(id);
            
          })
          .catch(err => Promise.reject(err));
        })
    )
      .then( () => {
        // console.log(userIdArr);
        done();
      })
      .catch(err => done(err));
  });

  


  
    
  it("READ The created users", function (done) {
    Promise.all(
      userIdArr.map( userId => {
        return testReadUser(userId)
          // .then(() => console.log(userId))
          .catch(err => Promise.reject(err));
        })
      )
      .then(() => done())
      .catch(err => done(err));
  });

  it("CREATE network of friends", function (done) {

    let friendArr = [];
    

    userIdArr.forEach ( userA => {
      userIdArr.forEach ( userB => {
        if (userA !== userB) friendArr.push([userA, userB]);
      });
    });

    Promise.all(
      friendArr.map(userCombo => {
        return testCreateFriend(userCombo[0], userCombo[1])
          .then((res) => friendObj[res] = userCombo)
          .catch(err => Promise.reject(err));
      })
    )
      .then(() => {
        // console.log(friendObj);
        done();
      })
      .catch(err => done(err));
  });

  it("READ Back network of friends by checking friend status", function (done) {

    Promise.all(
      Object.keys(friendObj).map(friendId => {
        let key = String(friendId);
        // console.log(friendObj[key][0]);
        return checkFriendStatus(key, friendObj[key][0], friendObj[key][1])
          // .then((res) => console.log(res))
          .catch(err => Promise.reject(err));
      })
    )
    .then(() => {
      // console.log(friendObj);
      done();
    })
    .catch(err => done(err));
  });

  it("READ Back network of friends by checking friend list", function (done) {

    Promise.all(
      userIdArr.map(userId => {
        return checkFriendList(userId, userIdArr.length-1)
          // .then((res) => console.log(res))
          .catch(err => Promise.reject(err));
      })
    )
      .then(() => {
        done();
      })
      .catch(err => done(err));
  });

  it("Delete a friend instance", function (done) {
    removeFriend(userIdArr[friendPairDel[0]], userIdArr[friendPairDel[1]])
      .then((res) => {
        // console.log(res);
        done();
      })
      .catch(err => done(err));
  });

  // readRemovedFriend
  it("Read deleted friend instance", function (done) {
    readRemovedFriend(userIdArr[friendPairDel[0]], userIdArr[friendPairDel[1]])
      .then((res) => {
        // console.log(res);
        done();
      })
      .catch(err => done(err));
  });

  it("Delete One User", function (done) {
    testDeleteUser(userIdArr[userToIdxDel])
      .then( () => {
        removedUserId = userIdArr.splice(userIdArr[userToIdxDel], 1);
        done();
      })
      .catch(err => done(err));
  });

  it("Ensure deleted user has been updated on friends table on RIGHT", function (done) {

    Promise.all(
      userIdArr.map(userId => {
        return readRemovedFriend(userId, removedUserId)
          // .then((res) => console.log(res))
          .catch(err => Promise.reject(err));
      })
    )
    .then(() => {
      // console.log(friendObj);
      done();
    })
    .catch(err => done(err));

  });

  it("Ensure deleted user has been updated on friends table on LEFT", function (done) {

    Promise.all(
      userIdArr.map(userId => {
        return readRemovedFriend(removedUserId, userId)
          // .then((res) => console.log(res))
          .catch(err => Promise.reject(err));
      })
    )
      .then(() => {
        // console.log(friendObj);
        done();
      })
      .catch(err => done(err));

  });
  
  it("DELETE Each remaining Users", function (done) {
    Promise.all(
      userIdArr.map(userId => {
        return testDeleteUser(userId)
          // .then(() => console.log(userId))
          .catch( err => Promise.reject(err));
        })
      )
      .then(() => done())
      .catch(err => done(err));
  });

};

