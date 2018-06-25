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

  let userIdArr = [];
  let friendIdArr = [];

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
        console.log(userIdArr);
        done();
      })
      .catch(err => done(err));
  });


  
    
  it("READ The created users", function (done) {
    Promise.all(
      userIdArr.map( userId => {
        return testReadUser(userId)
          .then(() => console.log(userId))
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
          .then((res) => friendIdArr.push(res))
          .catch(err => Promise.reject(err));
      })
    )
      .then(() => {
        console.log(friendIdArr);
        done();
      })
      .catch(err => done(err));
  });

  
  it("DELETE Each User", function (done) {
    Promise.all(
      userIdArr.map(userId => {
        return testDeleteUser(userId)
          .then(() => console.log(userId))
          .catch( err => Promise.reject(err));
        })
      )
      .then(() => done())
      .catch(err => done(err));
  });

};

