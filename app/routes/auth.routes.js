import express from 'express';
// import passport from 'passport';
import { deleteUser, updateUserForAuth } from "../controllers/user.controller";


module.exports = function (passport) {

  function passportCallback(err, user, info) {
    if (err) return next(err);
    if (!user) return next(info);
    req.login(user, function (err) {
      if (err) return next(err);
      return res.json(user);
    });
  }
  const router = express.Router();
  router
  .get('/', (req, res, next) => res.send('OK') )
  .post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) return next(err);
      if (!user) return next(info);
      req.login(user, function (err) {
        if (err) return next(err);
        return res.json(user);
      });
    })(req, res, next);
  })
  .post('/signup', function (req, res, next) {
      passport.authenticate('local-signup', function (err, user, info) {
        if (err) return next(err);
        if (!user) return next(info);
        req.login(user, function (err) {
          if (err) return next(err);
          return res.json(user);
        });
      })(req, res, next)
    })
  .post('/changepass/:id', function (req, res, next) {
    // res.send(req.params.id);
    let bodyCopy = {};
    bodyCopy.local = Object.assign({}, req.body);
    
    updateUserForAuth(req.params.id, bodyCopy)
      .then(users => res.json(users))
      .catch(err => next(err));
  });

  return router;
}

// export default router;