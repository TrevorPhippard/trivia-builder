'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'UserCollection',
      [
        {
          id: 1,
          owner: 1,
          room_id: 1,
          user_id: 1,
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserCollection', null, {});
  },
};
