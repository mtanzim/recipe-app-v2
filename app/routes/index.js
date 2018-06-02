var Users = require('../models/users.js');
var userRoutes = require('./user.routes');
var express = require('express');


module.exports = function (passport) {

  const router = express.Router();
  
  router
    .get('/health-check', (req, res, next) => res.send('OK!'))
    .use('/users', userRoutes);
  // router.get('/getUsers', listUsers);
  return router;
}