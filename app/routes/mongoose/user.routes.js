import express from 'express';
import { listUsers, createUser, deleteUser, updateUser, getOneUser } from "../../controllers/mongoose/user.controller";

const router = express.Router();

router.route('/')
  .get((req, res, next) => {
    listUsers()
      .then(users => res.json(users))
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    createUser(req.body)
      .then(user => res.json(user))
      .catch(err => next(err));
  });

router.route('/:id')
  .get((req, res, next) => {
    getOneUser(req.params.id)
      .then(users => res.json(users))
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    deleteUser(req.params.id)
      .then(user => res.json(user))
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    updateUser(req.params.id, req.body)
      .then(users => res.json(users))
      .catch(err => next(err));
  });

export default router;
