'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'user_tokens',
      {
        token_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(30),
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING(500),
        },
        user_id: {
          allowNull: false,
          type: Sequelize.STRING(30),
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
    return queryInterface.dropTable('user_tokens');
  }
};
