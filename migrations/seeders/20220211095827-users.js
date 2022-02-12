'use strict';

const bcrypt = require('bcrypt');
const { users } = require('../models');

// https://github.com/sequelize/cli/issues/752
const makePassword = (password) => bcrypt.hash(password, bcrypt.genSaltSync(8));

module.exports = {
  async up (queryInterface, Sequelize) {
    await users.bulkCreate([{
      id: 1,
      email: 'admin@skanus_receptai.lt',
      password: await makePassword('admin-password'),
      firstName: 'Admin',
      lastName: 'Admin',
    }, {
      id: 2,
      email: 'user2@skanus_receptai.lt',
      password: await makePassword('password'),
      firstName: 'John',
      lastName: 'Doe (2)',
    }, {
      id: 3,
      email: 'user3@skanus_receptai.lt',
      password: await makePassword('password'),
      firstName: 'John',
      lastName: 'Doe (3)',
    }, {
      id: 4,
      email: 'user4@skanus_receptai.lt',
      password: await makePassword('password'),
      firstName: 'John',
      lastName: 'Doe (4)',
    }, {
      id: 5,
      email: 'user5@skanus_receptai.lt',
      password: await makePassword('password'),
      firstName: 'John',
      lastName: 'Doe (5)',
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
