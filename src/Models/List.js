const { Model, DataTypes } = require('sequelize')

class List extends Model {
  static init(sequelize) {
    super.init({
      code_list: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      type: DataTypes.STRING,
      number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      description: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'lists',
    })
  }

  static associate(models) {
    this.belongsTo(models.Unity, { foreignKey: 'id_unity',  through: 'lists', as: 'unity' })
   }
}

module.exports = List