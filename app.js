


const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const util = require('util');
const favicon = require('serve-favicon');
const path = require('path');


module.exports = (config) => {

  const app = express();
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

  app.use('/api', routes(passport, null,'mongo'));

  // the following condition will allow mocha to work for now
  if (config.mysql.client){
    app.use('/apisql', routes(passport, config.mysql.client, 'sql'));
  }
  
  // app.use('/apitest', routes(passport, 'test'));

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var error = new Error('Not found!');
    next(error);
  });

  //provide err argument before req to tell Express it's an error handling function
  app.use((err, req, res, next) => {
    if (!config.isTesting){
      util.log(err.stack);
      util.log(err.message);
    }
    res.status(500).send(`Error found: ${err.message}`);
  })

  return app;
}