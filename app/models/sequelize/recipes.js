module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const Recipes = sequelize.define('Recipes', {
    title: DataTypes.STRING,
    notes: DataTypes.STRING,
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