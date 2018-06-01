import express from 'express';
import userCtrl from '../controllers/users.controller';



module.exports = () => {
  const router = express.Router();
  router
    .get('/', (req, res, next) => {
      // console.log('Coming to route!');
      userCtrl.list()
        .then(user => res.json(user))
        .catch (err => next(err));

    })
    .get('/createDef', (req, res, next) => {
      // console.log('Coming to route!');
      userCtrl.createDefault()
        .then(user => res.json(user))
        .catch(err => next(err));

    })

return router;

}

