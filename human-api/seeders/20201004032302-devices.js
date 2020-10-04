'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Devices', [
      {
        name: 'esp32',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'alfa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'bravo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'charlie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'delta',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Devices', null, {});
  }
};
