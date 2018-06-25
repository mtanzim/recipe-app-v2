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

  let userIdArr = [];

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
            console.log(userIdArr);
          })
          .catch(err => done(err));
        })
  )
  .then(()=> done());
});


  
    
/*   it("READ The created users", function (done) {
    userIdArr.forEach(userId => {
      testReadUser(userId)
        .then(() => console.log(userId) )
        .catch(err => done(err));
    });
    done();
  });

  
  it("DELETE Each User", function (done) {
    userIdArr.forEach(userId => {
      testDeleteUser(userId)
        .then(() => console.log(userId))
        .catch(err => done(err));
    });
    done();
  }); */
};

