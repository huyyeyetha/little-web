'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  	async up (queryInterface, Sequelize) {
     	await queryInterface.bulkInsert('User', [
		{
       		username: 'admin',
			password: '$2a$10$fMoCVw3zX8DILSwBER6JfeM3v5EIYeXO9rB7jerczXa51tBx3ksFS',
			createdAt: new Date(),
			isOnline: false
	    }, 
		{
			username: 'user',
			password: '$2a$10$IeHKozSv4Se2zeyF5xQVyur54Wki3xm8/eTvL4fsU5SLNMXqJKg1e',
			createdAt: new Date(),
			isOnline: false
	 	}
		], {});
  	},

  	async down (queryInterface, Sequelize) {
    	await queryInterface.bulkDelete('User', null, {});
  	}
};
