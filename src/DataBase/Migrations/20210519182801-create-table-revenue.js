'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('taxes_and_discounts', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ir: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
      },
      csll: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
      },
      cofins: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
      },
      pis_pasep: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
      },
      iss: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
      },
      percentage: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('taxes_and_discounts');
  }
};
