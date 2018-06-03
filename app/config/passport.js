'use strict';

// const GitHubStrategy = require('passport-github').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const createLocUserForAuth = require('../controllers/user.controller').createUser;
const findUserByEmail = require('../controllers/user.controller').getOneUserByEmail;


// const configAuth = require('./auth');

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
          .then( (user) => {
            if (!user) return done(new Error ('User not found'), false);
            if (!user.validPassword(password)) {
              return done(new Error ('Invalid password!'), false);
            } else {
              return done(null, user);
            }
          })
          .catch ( (err) => {
            return done (err, false);
          });
        })
      }));

        // User.findOne({ 'local.email': email }, function (err, user) {
        //   if (err) return done(err);
        //   if (user) {
        //     return done (null, false, {message:'User already exists!'});
        //     if (!user.validPassword(password)) {
        //       return done(null, false, { message: 'Please check password!' });
        //     } else {
        //       return done(null, user);
        //     }
        //   } else {
        //     return done(null, false, { message: 'User not found!' });
            //need to create new user
/*             var newUser = new User();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            console.log(newUser);
            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser);
            }) */
    //       }
    //     });
    //   });
    // }));
  //Facebook login strategdy
  //taken from: https://scotch.io/tutorials/easy-node-authentication-facebook#configuring-passports-facebook-strategy-configpassportjs
/*   passport.use(new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL

  },
    // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {
      // asynchronous
      process.nextTick(function () {

        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();
            console.log(profile);
            // set all of the facebook information in our user model
            newUser.facebook.id = profile.id; // set the users facebook id                   
            newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
            newUser.facebook.name = profile.displayName; // look at the passport user profile to see how names are returned
            //newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
            newUser.save(function (err) {
              if (err)
                throw err;
              // if successful, return the new user
              return done(null, newUser);
            });
          }

        });
      });

    }));



  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  },
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        User.findOne({ 'github.id': profile.id }, function (err, user) {
          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, user);
          } else {
            var newUser = new User();

            newUser.github.id = profile.id;
            newUser.github.username = profile.username;
            newUser.github.displayName = profile.displayName;
            newUser.github.publicRepos = profile._json.public_repos;
            newUser.nbrClicks.clicks = 0;

            newUser.save(function (err) {
              if (err) {
                throw err;
              }

              return done(null, newUser);
            });
          }
        });
      });
    })); */

};
