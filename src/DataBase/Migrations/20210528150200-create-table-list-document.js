'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('list_documents', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_list: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'lists', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_document: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'documents', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('list_documents');
  }
};
