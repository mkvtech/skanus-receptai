// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const recipeRatings = sequelizeClient.define('recipe_ratings', {
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  recipeRatings.associate = function (models) {
    recipeRatings.belongsTo(models.users, { foreignKey: { allowNull: false } })
    recipeRatings.belongsTo(models.recipes, { foreignKey: { allowNull: false } })
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  }

  return recipeRatings
}
