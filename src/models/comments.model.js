// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const comments = sequelizeClient.define('comments', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  comments.associate = function (models) {
    comments.belongsTo(models.users);
    comments.belongsTo(models.recipes);
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return comments;
};
