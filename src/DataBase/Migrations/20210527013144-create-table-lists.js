'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lists', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code_list: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      linked_to: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: "Entrega de documentos ao setor financeiro",
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: "Relatório contendo documentos para liquidação e pagamento",
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      unity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'units', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
    return queryInterface.dropTable('lists');
  }
};
