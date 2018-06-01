var Users = require('../models/users.js');
var userRoutes = require('./user.routes');
var listUsers = require('../controllers/user.controller');
//var Recipes=require(path + '/app/models/recipes.js');
var express = require('express');


module.exports = function (passport) {

  const router = express.Router();
  
  router.get('/health-check', (req, res, next) => res.send('OK!'));
  router.use('/users', userRoutes);
  // router.get('/getUsers', listUsers);
  return router;
}