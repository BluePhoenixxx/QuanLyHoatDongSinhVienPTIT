'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      act_name: {
        type: Sequelize.STRING
      },
      act_description: {
        type: Sequelize.STRING
      },
      act_address: {
        type: Sequelize.STRING
      },
      act_price: {
        type: Sequelize.STRING
      },
      act_status: {
        type: Sequelize.INTEGER
      },
      creater_id: {
        type: Sequelize.INTEGER
      },
      audit_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Activities');
  }
};