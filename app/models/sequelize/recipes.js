module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const Recipes = sequelize.define('Recipes', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          // notEmpty: true,
          len: [0, 100],
        }
      }
  });
  // relationship
  Recipes.associate = (models) => {
    Recipes.hasMany(models.Ingredients);
    Recipes.belongsTo(models.User, {
      onDelete: 'CASCADE', // if order is deleted, delete all order items
      foreignKey: {
        allowNull: false,
      },
    });
  }
  return Recipes;

};