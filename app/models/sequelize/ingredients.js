module.exports = (sequelize, DataTypes) => {

  // Implement schema here
  const Ingredients = sequelize.define('Ingredients', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    // _id: DataTypes.UUIDV1,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        // notEmpty: true,
        len: [0, 100],
      },
    },
    qty: {
      type:DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 0,
        max: 9999,
      },
    }
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