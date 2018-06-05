const LocalStrategy = require('passport-local').Strategy;
const createLocUserForAuth = require('../controllers/user.controller').createUser;
const findUserByEmail = require('../controllers/user.controller').getOneUserByEmailForAuth;

const User = require('../models/users');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  //Local sign up
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {
      process.nextTick(function () {
        let userToCreate = {}
        userToCreate.local = req.body;
        createLocUserForAuth(userToCreate)
          .then(user => done(null, user, { message: 'Welcome!' }))
          .catch(err => done(err, false));

      });
    }));


  // Local login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {
      process.nextTick(function () {
        findUserByEmail(email)
          .then((user) => {
            if (!user) return done(new Error('User not found'), false);
            if (!user.validPassword(password)) {
              return done(new Error('Invalid password!'), false);
            } else {
              return done(null, user);
            }
          })
          .catch((err) => {
            return done(err, false);
          });
      })
    }));
};
