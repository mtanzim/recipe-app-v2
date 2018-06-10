

module.exports = (sequelize, DataTypes) => {

  const bcrypt = require('bcrypt');
  const SALT_ROUNDS = 10;

  // Implement schema here
  const User = sequelize.define('User', {
    // _id: DataTypes.UUIDV1,
    _id: { 
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
    },
    username: {
      type:DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate: {
        
        notEmpty: true,
        // isEmail: true,
        len: [1, 25],
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [1, 25],
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 600],
      }
    },
  });

  //add method for comparing passwords
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // set hooks to ensure passwords are  hashed
  User.beforeSave((user, options) => {
    // console.log("COMING TO beforecreate!")
    return bcrypt.hash(user.password, SALT_ROUNDS)
      .then(hash => {
        user.password = hash;
      });
    });
  // relationship
  User.associate = models => User.hasMany(models.Recipes);
  return User;

};