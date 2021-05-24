const { Model, DataTypes } = require('sequelize')

class taxes_documents extends Model {
  static init(sequelize) {
  super.init({
      calculation: DataTypes.DECIMAL(10, 2),
    }, {
      sequelize,
      tableName: 'taxes_documents'
    })
  }
}

module.exports = taxes_documents