'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up (queryInterface, Sequelize) {
     	await queryInterface.bulkInsert('Threshold', [
			{SensorId: 'anhsang'},
			{SensorId: 'doamdat'},
			{SensorId: 'doamkk'},
			{SensorId: 'nhietdo'},
		], {});
  	},

  	async down (queryInterface, Sequelize) {
    	await queryInterface.bulkDelete('Threshold', null, {});
  	}
};
