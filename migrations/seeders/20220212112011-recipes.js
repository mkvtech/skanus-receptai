'use strict';

const { recipes } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await recipes.bulkCreate([{
      id: 1,
      name: 'First Recipe',
      description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
      userId: 1,
    }, {
      id: 2,
      name: 'Second Recipe',
      description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
      userId: 2,
    }, {
      id: 3,
      name: 'Third Recipe',
      description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
      userId: 2,
    }, {
      id: 4,
      name: 'Fourth Recipe',
      description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
      userId: 2,
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
