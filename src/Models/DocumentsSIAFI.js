const { Model, DataTypes } = require('sequelize')

class DocumentsSIAFI extends Model {
  static init(sequelize) {
    super.init({
      year: {
        type: DataTypes.STRING
      },
      document: {
        type: DataTypes.STRING
      },
      number: {
        type: DataTypes.STRING
      },
      document_date: {
        type: DataTypes.STRING,
      }, 
    }, {
      sequelize,
      tableName: 'documents_siafi'
    })
  }

  static associate(models) {
    this.belongsToMany(models.Documents, { foreignKey: 'document_siafi_id', through: 'documents_siafi_documents', as: 'documents' })
  }
}

module.exports = DocumentsSIAFI