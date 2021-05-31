const { Model, DataTypes } = require('sequelize')

class list_documents extends Model {
  static init(sequelize) {
  super.init({
      status: DataTypes.BOOLEAN,
    }, {
      sequelize,
      tableName: 'list_documents'
    })
  }
}

module.exports = list_documents