// note that .then() on promises already exectuces the exec()
// http://mongoosejs.com/docs/api.html#query_Query-then

import express from 'express';
import Users  from '../models/users.js';
import userRoutes  from './user.routes';
import authRoutes from './auth.routes';
import recipeRoutes from './recipes.routes';

module.exports = function (passport) {

  const router = express.Router();
  
  router
    .get('/health-check', (req, res, next) => res.send('OK!'))
    .use('/users', userRoutes)
    .use('/recipes', recipeRoutes)
    .use('/auth', authRoutes(passport) );

  return router;
}