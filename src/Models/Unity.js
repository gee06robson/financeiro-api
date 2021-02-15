const { Model, DataTypes } = require('sequelize')

class Unity extends Model {
  static init(sequelize) {
    super.init({
      code_unity: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      unity: {
        type: DataTypes.STRING,
      },
      records: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      tableName: 'units',
    })
  }

  static associate(models) {
    this.hasMany(models.List, { foreignKey: 'id_unity',  as: 'lists' })
  }
}

module.exports = Unity