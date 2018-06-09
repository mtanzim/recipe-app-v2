module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const User = sequelize.define('User', {
    // _id: DataTypes.UUIDV1,
    _id: { 
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1, 
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
  });
  // relationship
  User.associate = models => User.hasMany(models.Recipes);
  return User;

};