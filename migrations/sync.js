const app = require('../src/app');
const sequelize = app.get('sequelizeClient');

(async () => {
  console.log('Syncrhonizing database...');

  // see also src/sequelize.js
  const models = sequelize.models;
  Object.values(models).forEach(model => model.associate(models));

  await sequelize.sync({ force: true });

  console.log('All models were synchronized successfully.');
  console.log('Dont forget to run `npx sequelize db:seed:all` to fill tables with sample data.');
})();
