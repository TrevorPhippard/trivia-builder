'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Message',
      [
        {
          id: 1,
          room_id: 1,
          body_text: 'i am user1 in room 1',
          user_id: 1,
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
        {
          id: 2,
          room_id: 2,
          body_text: 'i am user2 in room 2',
          user_id: 2,
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Message', null, {});
  },
};
