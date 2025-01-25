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
          password: '$2a$10$JdDz3vj91MYuWRw3T5Tm2OBojoAEImOeiXZcO7/ES84pVJnYM57qG',
          createdAt: '2019-03-01 06:00:00+00',
          updatedAt: '2019-03-01 06:00:00+00',
        },
        {
          id: 2,
          account_id: 2,
          user_name: 'duck',
          email: 'duck@pond.com',
          password: '$2a$10$JdDz3vj91MYuWRw3T5Tm2OBx8jZq7pHHY0.cGCsKfpct6zvnQ1jVS',
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
