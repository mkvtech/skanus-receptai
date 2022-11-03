// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const comments = sequelizeClient.define(
    'comments',
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
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

  comments.associate = function (models) {
    comments.belongsTo(models.users, { foreignKey: { allowNull: false } })
    comments.belongsTo(models.recipes, { foreignKey: { allowNull: false } })
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  }

  return comments
}
