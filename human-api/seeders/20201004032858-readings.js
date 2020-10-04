'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Readings', [
      {
        deviceId: 2,
        temperature: 24.3,
        humidity: 63.7,
        actuator: false,
        createdAt: new Date()
      },
      {
        deviceId: 3,
        temperature: 24.3,
        humidity: 63.7,
        actuator: false,
        createdAt: new Date()
      },
      {
        deviceId: 4,
        temperature: 24.3,
        humidity: 63.7,
        actuator: false,
        createdAt: new Date()
      },
      {
        deviceId: 5,
        temperature: 24.3,
        humidity: 63.7,
        actuator: false,
        createdAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
