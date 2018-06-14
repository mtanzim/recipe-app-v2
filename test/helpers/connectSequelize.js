
module.exports = () => {
  let config = require('../../app/config');
  const util = require('util');
  //connect to SQL
  const Sequelize = require('sequelize');

  //remove logging from mysql
  config.mysql.options.logging = false;

  const sequelize = new Sequelize(config.mysql.options);
  sequelize.authenticate()
    .then(() => {
      // util.log('Successfully connected to mysql');
    })
    .catch((err) => {
      util.log(err);
      process.exit;
    });
  // save mysql client to config for app usage

  return sequelize;
}

