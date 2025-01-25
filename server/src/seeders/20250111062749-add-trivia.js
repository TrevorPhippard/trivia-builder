'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Trivia',
      [
        {
          id: 1,
          owner: 1,
          trivia_name: 'string',
          question_collection: 1,
          bg_bcolour: 'string',
          text_colour: 'string',
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Trivia', null, {});
  },
};
