import express from 'express';
import { getAllRecipes, createRecipe, getRecipeByUser, getOneRecipe } from "../controllers/recipes.controller";

const router = express.Router();
router.route('/')
  // get all recipes from all users
  .get( (req, res, next) => {
    getAllRecipes()
      .then(recipes => res.json(recipes))
      .catch(err => next(err));
  });

router.route('/:userid')
  // get all recipes for user
  .get( (req, res, next) => {
    getRecipeByUser(req.params.userid)
      .then(recipe => res.json(recipe))
      .catch(err => next(err));
  })
  //create new recipe for user
  .post( (req, res, next) => {
    createRecipe(req.params.userid,req.body)
      .then(recipe => res.json(recipe))
      .catch(err => next(err));
  })
  //delete all recipes for user
  .delete( (req, res, next) => {
  });

router.route('/single/:recipeid')
  // get specific recipe
  .get( (req, res, next) => {
    getOneRecipe(req.params.recipeid)
      .then(recipes => res.json(recipes))
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
  })
  // update specific recipe
  .put( (req, res, next) => {
  });

export default router;
