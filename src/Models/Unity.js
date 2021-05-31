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
    this.belongsToMany(models.User, { foreignKey: 'id_unity', through: 'unity_user', as: 'users' })
    this.belongsToMany(models.Documents, { foreignKey: 'id_unity', through: 'unity_document', as: 'documents' })
    this.hasMany(models.List, { foreignKey: 'unity_id',  as: 'lists' })
  }
}

module.exports = Unity