'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        user_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(200),
        },
        user_email: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        user_dob: {
          type: Sequelize.STRING(30),
        },
        user_name: {
          type: Sequelize.STRING(100),
        },
        user_phone: {
          type: Sequelize.STRING(20),
        },
        user_password: {
          allowNull: false,
          type: Sequelize.STRING(1000),
        },
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updatedAt: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
