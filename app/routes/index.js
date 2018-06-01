import express from 'express';
import userRoutes from './users.route';
// import postRoutes from './posts.route';
// import commentRoutes from './comments.route';
import isLoggedIn from '../config/isLoggedIn'

module.exports = function (passport) {
  const router = express.Router();
  router.get('/health-check', (req, res) => {
    return res.send('OK');
  });

  // router.route('/')
    // app.route('/getUsers')
  // router.get('/users', async (req, res, next) => {
  //     console.log('Coming to route!')
  //     try {
  //       const users = await userCtrl.list();
  //       return res.json(users);
  //     } catch (err) {
  //       next(err);
  //     }

  //   });

  router.use('/users', userRoutes());

  return router;
}