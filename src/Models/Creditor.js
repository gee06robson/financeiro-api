const { Model, DataTypes } = require('sequelize')

class Creditors extends Model {
  static init(sequelize) {
    super.init({
      code: DataTypes.STRING,
      reason: DataTypes.STRING, 
    }, {
      sequelize,
      tableName: 'creditors'
    })
  }

  static associate(models) {
    this.hasMany(models.Documents, { foreignKey: 'creditor_id',  as: 'documents' })
  }
}

module.exports = Creditors