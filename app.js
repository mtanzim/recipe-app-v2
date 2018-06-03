


var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var util = require('util');
var favicon = require('serve-favicon');
var path = require('path');


module.exports = (config) => {

  var app = express();
  if (process.env.NODE_ENV !== 'production' && !config.isTesting) {
    app.use(config.logger)
  }

  if (process.env.NODE_ENV === 'production') {
    app.use('/static', express.static(process.cwd() + '/client/build/static'));
  }


  app.use(favicon(path.join(__dirname, 'client', 'build', 'favicon.ico')));
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));
  }

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', routes(passport));

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var error = new Error('Not found!');
    next(error);
  });

  //provide err argument before req to tell Express it's an error handling function
  app.use((err, req, res, next) => {
    res.status(500).send(`Error found: ${err.message}`);
  })

  return app;
}