// note that .then() on promises already exectuces the exec()
// http://mongoosejs.com/docs/api.html#query_Query-then

import express from 'express';
import userRoutes  from './mongoose/user.routes';
import authRoutes from './mongoose/auth.routes';
import recipeRoutes from './mongoose/recipes.routes';
import ingRoutes from './mongoose/ingredients.routes';

module.exports = function (passport) {

  const router = express.Router();
  
  router
    .get('/health-check', (req, res, next) => res.send('OK!'))
    .use('/users', userRoutes)
    .use('/recipes', recipeRoutes)
    .use('/ing', ingRoutes)
    .use('/auth', authRoutes(passport) );

  return router;
}