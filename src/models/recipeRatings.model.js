// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const recipeRatings = sequelizeClient.define(
    'recipe_ratings',
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: 1, msg: 'Rating must be 1 or greater' },
          max: { args: 5, msg: 'Rating must be 5 or less' },
        },
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true
        },
      },
      indexes: [
        {
          fields: ['userId', 'recipeId'],
          unique: true,
        },
      ],
    }
  )

  recipeRatings.associate = function (models) {
    recipeRatings.belongsTo(models.users, { foreignKey: { allowNull: false } })
    recipeRatings.belongsTo(models.recipes, { foreignKey: { allowNull: false } })
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  }

  return recipeRatings
}
