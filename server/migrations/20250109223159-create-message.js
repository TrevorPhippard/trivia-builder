'use strict';
/** @type {import("sequelize-cli").Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Message', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      room_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      body_text: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('Message');
  },
};
