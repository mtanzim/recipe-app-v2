
// import { listUsers, createUser, deleteUser, updateUser, getOneUser } from "../../controllers/mongoose/user.controller";


// 0 is for recipes
// 1 is for ingredients
module.exports = (sqlClient, selector) => {

  const RecipeController = require('../../controllers/sequelize/recipes.ingredients.controller')(sqlClient, 0);
  // const IngredientController = require('../../controllers/sequelize/recipes.ingredients.controller')(sqlClient, 0);

  const express = require('express');
  const router = express.Router();

  let create=null;
  let getAll = null;

  // if (selector === 0) {
    create = RecipeController.create;
    getAll = RecipeController.getAll;
  // } else {
  //    create = IngredientController.create;
  //    getAll = IngredientController.getAll;
  // }

  // const getOne = require('../../controllers/sequelize/recipes.ingredients.controller')(sqlClient, selector).getOne;
  // const update = require('../../controllers/sequelize/recipes.ingredients.controller')(sqlClient, selector).updateOne;
  // const remove = require('../../controllers/sequelize/recipes.ingredients.controller')(sqlClient, selector).deleteOne;
  const ErrorMessage = new Error ("Item not found!");

  router.route('/health-check')
    .get((req, res, next) => {
      res.send(`OK with SELECTOR:${selector} in ${(req.baseUrl + req.url)}`);
    });

  router.route('/')
    .get((req, res, next) => {
      getAll()
        .then(items => items ? res.json(items) : next(ErrorMessage))
        .catch(err => next(err));
      });

  router.route('/:parentid')
    .post((req, res, next) => {
      create(req.params.parentid, req.body)
        .then(items => res.json(items))
        .catch(err => {
          console.log(err);
          next(err)
        });
      })
    // get all recipes for user or ingredient for recipe
    .get((req, res, next) => {
      getAll(req.params.parentid)
        .then(items => items ? res.json(items) : next(userErrorMessage))
        .catch(err => next(err));
    })

    // delete  all recipes for user or ingredient for recipe
/*     .delete((req, res, next) => {
      deleteUser(req.params.id)
        .then(users => users ? res.json(users) : next(userErrorMessage))
        .catch(err => next(err));
    }); */

/*   router.route('/single/:id')
    // get one recipe or one ingredient
    .get((req, res, next) => {
      getOneUser(req.params.id)
        .then(users => users ? res.json(users) : next(userErrorMessage))
        .catch(err => next(err));
    })
    // update one recipe or one ingredient
    .put((req, res, next) => {
      getOneUser(req.params.id)
        .then(users => users ? res.json(users) : next(userErrorMessage))
        .catch(err => next(err));
    })
    // delete one recipe or one ingredient
    .delete((req, res, next) => {
      deleteUser(req.params.id)
        .then(users => users ? res.json(users) : next(userErrorMessage))
        .catch(err => next(err));
    }); */

  return router;

};
