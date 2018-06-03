import express from 'express';
import { listUsers, createUser, deleteUser, updateUser, getOneUser } from "../controllers/user.controller";

const router = express.Router();
router
  .get('/', (req, res, next) => {
    listUsers()
      .then(users => res.json(users))
      .catch(err => next(err));
  })
  .get('/:id', (req, res, next) => {
    getOneUser(req.params.id)
      .then(users => res.json(users[0]))
      .catch(err => next(err));
  })
  .post('/', (req, res, next) => {
    createUser(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
  })
  .delete('/:id', (req, res, next) => {
    // return res.send(req.params.id);
    deleteUser(req.params.id)
      .then(user => res.json(user))
      .catch(err => next(err));
  })
  .put('/:id', (req, res, next) => {
    // return res.json(req.body);
    updateUser(req.params.id, req.body)
      .then(users => res.json(users))
      .catch(err => next(err));
  });

export default router;
