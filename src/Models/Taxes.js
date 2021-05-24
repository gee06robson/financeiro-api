const { Model, DataTypes } = require('sequelize')

class Taxes extends Model {
  static init(sequelize) {
    super.init({
      code: DataTypes.INTEGER,
      ir: DataTypes.DECIMAL(10, 2),
      csll: DataTypes.DECIMAL(10, 2),
      cofins: DataTypes.DECIMAL(10, 2),
      pis_pasep: DataTypes.DECIMAL(10, 2),
      iss: DataTypes.DECIMAL(10, 2),
      percentage: DataTypes.DECIMAL(10, 2),
      description: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'taxes_and_discounts',
    })
  }

  static associate(models) {
    this.belongsToMany(models.Documents, { foreignKey: 'id_tax', through: 'taxes_documents', as: 'documents'  })
  }
}

module.exports = Taxes