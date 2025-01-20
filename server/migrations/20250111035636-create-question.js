'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Question', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      slide_rank: {
        type: Sequelize.INTEGER,
      },
      owner: {
        type: Sequelize.STRING,
      },
      trivia_id: {
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      question: {
        type: Sequelize.STRING,
      },
      options: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
      },
      bgImg: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Question');
  },
};
