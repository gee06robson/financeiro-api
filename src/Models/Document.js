const { Model, DataTypes } = require('sequelize')

class Documents extends Model {
   static init(sequelize) {
    super.init({
      number: DataTypes.STRING,
      emission: DataTypes.STRING,
      due: DataTypes.STRING,
      value: DataTypes.DECIMAL(10, 2),
      status: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'documents',
    })
   }

   static associate(models) {
    this.belongsTo(models.Creditors, { foreignKey: 'creditor_id',  through: 'documents', as: 'creditor' })
   }
}

module.exports = Documents