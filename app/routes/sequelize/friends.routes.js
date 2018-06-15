module.exports = (sqlClient) => {
  const express = require('express');
  const router = express.Router();

  const createFriend = require('../../controllers/sequelize/friends.controller')(sqlClient).create;

  router.route('/health-check')
    .get((req, res, next) => {
      res.send(`OK in ${(req.baseUrl + req.url)}`);
    });

  router.route('/:idA/:idB')
    // .get((req, res, next) => {
    //   getOneUser(req.params.id)
    //     .then(users => users ? res.json(users) : next(userErrorMessage))
    //     .catch(err => next(err));
    // })
    .post((req, res, next) => {
      createFriend(req.params.idA,req.params.idB)
        .then(friends => res.json(friends))
        .catch(err => next(err));
      // res.json({A:req.params.idA, B:req.params.idB});
      // updateUser(req.params.id, req.body)
      //   .then(users => res.json(users))
      //   .catch(err => next(err));
    });

  return router;
}
