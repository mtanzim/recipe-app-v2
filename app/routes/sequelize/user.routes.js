
// import { listUsers, createUser, deleteUser, updateUser, getOneUser } from "../../controllers/mongoose/user.controller";



module.exports = (sqlClient) => {

  const express = require('express');
  const router = express.Router();
  const createUser = require('../../controllers/sequelize/user.controller')(sqlClient).create;
  const getAllUsers = require('../../controllers/sequelize/user.controller')(sqlClient).getAll;


  router.route('/health-check')
    .get((req, res, next) => {
      res.send(`OK in ${(req.baseUrl + req.url)}`);
    });

  router.route('/')
    .get((req, res, next) => {
      getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
    })
    .post((req, res, next) => {
      // console.log(req.body);
      createUser(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
      // res.send('bout to create user');
    });

  return router;

}





/* router.route('/')
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
  }); */