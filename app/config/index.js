const morgan = require('morgan');
const appname = 'Recipes';
const isLoggedIn = require('./isLoggedIn');
const passport = require('passport');
const passportConfig = require('./passport')(passport);
const mysql = require('./mysql')
// const mysqlNoLog = require('./mysqlNoLog')


module.exports = {
  applicationName: appname,
  logger: morgan('dev'),
  isLoggedIn: isLoggedIn,
  passport: passportConfig,
  mysql: mysql,
};