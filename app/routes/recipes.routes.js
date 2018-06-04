import express from 'express';
import { getAllRecipes, createRecipe } from "../controllers/recipes.controller";

const router = express.Router();
router
  // get all recipes from all users
  .get('/', (req, res, next) => {
    getAllRecipes()
      .then(recipes => res.json(recipes))
      .catch(err => next(err));
  })
  // get all recipes for user
  .get('/:userid', (req, res, next) => {
  })
  //create new recipe for user
  .post('/:userid/', (req, res, next) => {
    // return res.send(req.body);
    createRecipe(req.params.userid,req.body)
      .then(recipe => res.json(recipe))
      .catch(err => next(err));
  })
  //delete all recipes for user
  .delete('/:userid/', (req, res, next) => {
  })
  // get specific recipe
  .get('/:userid/:recipeid', (req, res, next) => {
  })

  // delete specific recipe
  .delete('/:userid/:recipeid', (req, res, next) => {
  })
  // update specific recipe
  .put('/:userid/:recipeid', (req, res, next) => {
  });

export default router;
