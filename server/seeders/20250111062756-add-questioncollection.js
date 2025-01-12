'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'QuestionCollection',
      [
        {
          id: 1,
          owner: 1,
          trivia_id: 1,
          question_id: 1,
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('QuestionCollection', null, {});
  },
};
