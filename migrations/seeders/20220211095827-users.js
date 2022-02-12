'use strict';

const bcrypt = require('bcrypt');
const { users } = require('../models');

// https://github.com/sequelize/cli/issues/752
const makePassword = (password) => bcrypt.hash(password, bcrypt.genSaltSync(8));

module.exports = {
  async up (queryInterface, Sequelize) {
    await users.bulkCreate([{
      email: 'admin@skanus_receptai.lt',
      password: await makePassword('admin-password'),
      firstName: 'John',
      lastName: 'Doe (1)',
    }, {
      email: 'user@skanus_receptai.lt',
      password: await makePassword('password'),
      firstName: 'John',
      lastName: 'Doe (2)',
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
