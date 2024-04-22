'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up (queryInterface, Sequelize) {
     	await queryInterface.bulkInsert('Garden', [
			{
				name: 'Vườn 1',
				description: 'Main garden',
				createdAt: "2024-03-03"
			}, 
			{
				name: 'Vườn 2',
				description: 'Fake garden',
				createdAt: "2024-03-03"
			},
			{
				name: 'Vườn 3',
				description: 'Fake garden',
				createdAt: "2024-03-03"
			}
		], {});
  	},

  	async down (queryInterface, Sequelize) {
    	await queryInterface.bulkDelete('Garden', null, {});
  	}
};
