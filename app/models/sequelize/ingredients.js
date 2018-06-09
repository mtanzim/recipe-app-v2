module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const Ingredients = sequelize.define('Ingredients', {
    // _id: DataTypes.UUIDV1,
    title: DataTypes.STRING,
    unit: DataTypes.STRING,
    qty: DataTypes.INTEGER,
  });
  // relationship
  Ingredients.associate = (models) => {
    // Recipes.hasMany(models.Ingredients);
    Ingredients.belongsTo(models.Recipes, {
      onDelete: 'CASCADE', // if order is deleted, delete all order items
      foreignKey: {
        allowNull: false,
      },
    });
  }
  
  return Ingredients;

};