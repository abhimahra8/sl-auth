'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        user_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(30),
        },
        user_email: {
          allowNull: false,
          type: Sequelize.STRING(4),
        },
        user_dob: {
          type: Sequelize.STRING(16),
        },
        user_name: {
          type: Sequelize.STRING(16),
        },
        user_phone: {
          type: Sequelize.STRING(16),
        },
        user_password: {
          allowNull: false,
          type: Sequelize.STRING(500),
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
