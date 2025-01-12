'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Question',
      [
        {
          id: 1,
          slide_rank: 1,
          owner: 1,
          trivia: 1,
          category: 1,
          type: 'multiple',
          question: 'what is life',
          options: 'string',
          answer: 'string',
          bgImg: 'string',
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
        {
          id: 2,
          slide_rank: 2,
          owner: 1,
          trivia: 1,
          category: 1,
          type: 'multiple',
          question: 'what is time',
          options: 'string',
          answer: 'string',
          bgImg: 'string',
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
        {
          id: 3,
          slide_rank: 1,
          owner: 1,
          trivia: 2,
          category: 1,
          type: 'multiple',
          question: 'what is nothing',
          options: 'string',
          answer: 'string',
          bgImg: 'string',
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Question', null, {});
  },
};
