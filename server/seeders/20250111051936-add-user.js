'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          id: 1,
          account_id: 1,
          user_name: 'test',
          email: 'test@test.com',
          password: 'test',
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
        {
          id: 2,
          account_id: 2,
          user_name: 'trevor',
          email: 'trevor@trevor.com',
          password: 'trevor',
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
