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
    recipes.hasMany(models.recipe_ratings, { foreignKey: { allowNull: false } })
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  }

  recipes.prototype.generatePageLink = function () {
    return `${app.get('utils').fullBaseUrl}/recipes/${this.id}`
  }

  recipes.prototype.getTotalRating = async function () {
    const myRecipeRatings = await this.getRecipe_ratings()

    if (!myRecipeRatings.length) {
      return 0
    }

    const sum = myRecipeRatings.reduce((accumulator, current) => accumulator + current.rating, 0)

    return sum / myRecipeRatings.length
  }

  return recipes
}
