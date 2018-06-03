import express from 'express';
// import passport from 'passport';


module.exports = function (passport) {
  const router = express.Router();
  router
  .get('/', (req, res, next) => res.send('OK') )
  .post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(info);
        }
        // return res.json(user);
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.json(user);
        });
      })(req, res, next)
    })
  .post('/signup', function (req, res, next) {
      passport.authenticate('local-signup', function (err, user, info) {
        // console.log(info.message);
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(info);
        }
        // return res.json(user);
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.json(user);
        });
      })(req, res, next)
    });

  return router;
}

// export default router;