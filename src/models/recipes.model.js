// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const recipes = sequelizeClient.define(
    'recipes',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true
        },
      },
    }
  )

  recipes.associate = function (models) {
    recipes.belongsTo(models.users, { foreignKey: { allowNull: false } })
    recipes.hasMany(models.comments, { foreignKey: { allowNull: false } })
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  }

  return recipes
}
