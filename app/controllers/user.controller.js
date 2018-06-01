const Users = require('../models/users');

module.exports = function (req, res, next) {
  Users.find(function (err, users) {
    if (err) {
      // res.json({ isError: true });
      return next(err);
    } else {
      var userArray = [];
      users.forEach(user => {
        // console.log(user.displayName);
        var jsonUser = user.toJSON({ virtuals: true });
        userArray.push(jsonUser);
      });
      //console.log(user._id);
      //var jsonUser = user.toJSON({ virtuals: true });
      res.json({ isError: false, content: userArray });
    }
  });
}