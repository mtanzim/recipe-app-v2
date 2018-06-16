module.exports = (sqlClient) => {
  const express = require('express');
  const router = express.Router();

  const createFriend = require('../../controllers/sequelize/friends.controller')(sqlClient).create;
  const checkFriendStatus = require('../../controllers/sequelize/friends.controller')(sqlClient).checkFriendStatus;
  const listFriends = require('../../controllers/sequelize/friends.controller')(sqlClient).listFriends;

  router.route('/health-check')
    .get((req, res, next) => {
      res.send(`OK in ${(req.baseUrl + req.url)}`);
    });

  router.route('/:id')
    .get((req, res, next) => {
      listFriends(req.params.id)
        .then(friends => friends ? res.json(friends): next(new Error('No friends found!')))
        .catch(err => next(err));
    })

  router.route('/:idA/:idB')
    .get((req, res, next) => {
      checkFriendStatus(req.params.idA, req.params.idB)
        .then(friends => res.json(friends))
        .catch(err => next(err));
    })
    .post((req, res, next) => {
      createFriend(req.params.idA,req.params.idB)
        .then(friends => res.json(friends))
        .catch(err => next(err));
    });

  return router;
}
