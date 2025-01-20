'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Message',
      [
        {
          id: 40,
          user_id: 'duck',
          room_id: 'active-users',
          body_text: 'test1',
          createdAt: '2025-01-19 09:01:09.196+00',
          updatedAt: '2025-01-19 09:01:09.196+00',
        },
        {
          id: 41,
          user_id: 'duck',
          room_id: 'active-users',
          body_text: 'test',
          createdAt: '2025-01-19 20:40:55.454+00',
          updatedAt: '2025-01-19 20:40:55.454+00',
        },
        {
          id: 42,
          user_id: 'duck',
          room_id: 'active-users',
          body_text: 'test',
          createdAt: '2025-01-19 20:40:56.589+00',
          updatedAt: '2025-01-19 20:40:56.589+00',
        },
        {
          id: 43,
          user_id: 'duck',
          room_id: 'active-users',
          body_text: 'test',
          createdAt: '2025-01-19 20:40:57.653+00',
          updatedAt: '2025-01-19 20:40:57.653+00',
        },
        {
          id: 44,
          user_id: 'duck',
          room_id: 'active-users',
          body_text: 'test',
          createdAt: '2025-01-19 20:40:58.717+00',
          updatedAt: '2025-01-19 20:40:58.717+00',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Message', null, {});
  },
};
