// note that .then() on promises already exectuces the exec()
// http://mongoosejs.com/docs/api.html#query_Query-then

import express from 'express';
import userRoutes  from './mongoose/user.routes';
import authRoutes from './mongoose/auth.routes';
import recipeRoutes from './mongoose/recipes.routes';
import ingRoutes from './mongoose/ingredients.routes';

import userSqlRoutes from './sequelize/user.routes';
import reccipeIngRoutes from './sequelize/recipes.ingredients.routes';


module.exports = function (passport, sqlClient, dbType) {

  const router = express.Router();

  if (dbType === 'mongo') {
    router
      .get('/health-check', (req, res, next) => res.send('OK!'))
      .use('/users', userRoutes)
      .use('/recipes', recipeRoutes)
      .use('/ing', ingRoutes)
      .use('/auth', authRoutes(passport));
  } else if ( dbType === 'sql') {
    router
      .get('/health-check', (req, res, next) => res.send('OK!'))
      .use('/users', userSqlRoutes(sqlClient))
      .use('/recipes', reccipeIngRoutes(sqlClient,0))
      .use('/ingredients', reccipeIngRoutes(sqlClient, 1));

  } else {
    throw new Error("Please specify valid database type!");
  }
  


  return router;
}