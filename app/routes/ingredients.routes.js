import express from 'express';
import {
  getAllIng,
  createIng,
} from "../controllers/ingredients.controller";

const router = express.Router();

router.route('/health')
  .get((req, res, next) => res.send('OK'));

router.route('/')
  .get((req,res,next) => {
    getAllIng()
      .then(ing => ing.length !== 0 ? res.json(ing) : next(new Error('No ingredients found!')))
      .catch( err => next(err));
  });

router.route('/:recipeid')
  // create new recipe for user
  .post((req, res, next) => {
    createIng(req.params.recipeid, req.body)
      .then(ing => res.json(ing))
      .catch(err => next(err));
  })

/* router.route('/')
  // get all recipes from all users
  .get((req, res, next) => {
    getAllRecipes()
      .then(recipes => recipes.length !== 0 ? res.json(recipes) : next(new Error('No recipes found!')))
      .catch(err => next(err));
  });

router.route('/:userid')
  // create new recipe for user
  .post((req, res, next) => {
    createRecipe(req.params.userid, req.body)
      .then(recipe => res.json(recipe))
      .catch(err => next(err));
  })
  // read all recipes for user
  .get((req, res, next) => {
    getRecipeByUser(req.params.userid)
      .then(recipes => recipes.length !== 0 ? res.json(recipes) : next(new Error ('No recipes found!')))
      .catch(err => next(err));
  })
  //delete all recipes for user
  .delete((req, res, next) => {
    deleteAllRecipesForUser(req.params.userid)
      .then(recipes => recipes.length > 0 ? res.json(recipes) : next(new Error('No recipes found!')))
      .catch(err => next(err));
  });

router.route('/single/:recipeid')
  // read specific recipe
  .get((req, res, next) => {
    getOneRecipe(req.params.recipeid)
      // .then(recipes => res.json(recipes))
      .then(recipes => recipes ? res.json(recipes) : next(new Error('No recipes found!')))
      .catch(err => next(err));
  })
  // update specific recipe
  .put((req, res, next) => {
    updateOneRecipe(req.params.recipeid, req.body)
      .then(recipes => recipes ? res.json(recipes) : next(new Error('No recipes found!')))
      .catch(err => next(err));
  })
  // delete specific recipe
  .delete((req, res, next) => {
    deleteOneRecipe(req.params.recipeid)
      .then(recipes => res.json(recipes))
      .catch(err => next(err));
  }); */

export default router;
