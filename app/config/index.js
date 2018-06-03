const morgan = require('morgan');
const appname = 'Recipes';
const isLoggedIn = require('./isLoggedIn');
const passport = require('passport');
const passportConfig = require('./passport')(passport);

module.exports = {
  applicationName: appname,
  logger: morgan('dev'),
  isLoggedIn: isLoggedIn,
  passport: passportConfig,
};