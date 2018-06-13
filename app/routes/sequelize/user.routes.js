
// import { listUsers, createUser, deleteUser, updateUser, getOneUser } from "../../controllers/mongoose/user.controller";



module.exports = (sqlClient) => {

  const express = require('express');
  const router = express.Router();

  const createUser = require('../../controllers/sequelize/user.controller')(sqlClient).create;
  const getAllUsers = require('../../controllers/sequelize/user.controller')(sqlClient).getAll;
  const getOneUser = require('../../controllers/sequelize/user.controller')(sqlClient).getOne;
  const updateUser = require('../../controllers/sequelize/user.controller')(sqlClient).updateOne;
  const deleteUser = require('../../controllers/sequelize/user.controller')(sqlClient).deleteOne;

  const checkPass = require('../../controllers/sequelize/user.controller')(sqlClient).checkPass;

  const userErrorMessage = new Error ("User not found!");


  router.route('/health-check')
    .get((req, res, next) => {
      res.send(`OK in ${(req.baseUrl + req.url)}`);
    });

  router.route('/check-pass/:id')
    .post((req, res, next) => {
      // console.log(req.params.id);
      checkPass(req.params.id,req.body)
        .then(users => users ? res.json(users) : next(userErrorMessage))
        .catch(err => {
          console.log(err);
          next(err)
        });
    });

  router.route('/')
    .get((req, res, next) => {
      getAllUsers()
        .then(users => users ? res.json(users) : next(userErrorMessage))
        .catch(err => next(err));
    })
    .post((req, res, next) => {
      // console.log(req.body);
      createUser(req.body)
        .then(user => res.json(user))
        .catch(err => {
          console.log(err);
          next(err)
        });
      // res.send('bout to create user');
    });
  router.route('/:id')
    .get((req, res, next) => {
      getOneUser(req.params.id)
        .then(users => users ? res.json(users) : next(userErrorMessage))
        .catch(err => next(err));
    })
    .post((req, res, next) => {
      updateUser(req.params.id, req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
    })
    .put((req, res, next) => {
      updateUser(req.params.id, req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
    })
    .delete((req, res, next) => {
      deleteUser(req.params.id)
        .then(users => users ? res.json(users) : next(userErrorMessage))
        .catch(err => next(err));
    });

  return router;

};
