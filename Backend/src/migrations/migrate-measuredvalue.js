'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MeasuredValue', {
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE
      },
      SensorId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.INTEGER
      },
      isBelowLowerBound: {
        type: Sequelize.BOOLEAN
      },
      isAboveUpperBound: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MeasuredValue');
  }
};