'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up (queryInterface, Sequelize) {
     	await queryInterface.bulkInsert('Lighting', [
			{DeviceId: 'den', color: '#ffffff', intensity: 700},
		], {});
  	},

  	async down (queryInterface, Sequelize) {
    	await queryInterface.bulkDelete('Lighting', null, {});
  	}
};
