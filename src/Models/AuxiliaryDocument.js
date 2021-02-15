const { Model, DataTypes } = require('sequelize')

class AuxiliaryDocument extends Model {
  static init(sequelize) {
    super.init({
      type: DataTypes.STRING,
      number: DataTypes.STRING,
      value: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
      },
    }, {
      sequelize,
      tableName: 'auxiliary_documents'
    })
  }

}

module.exports = AuxiliaryDocument