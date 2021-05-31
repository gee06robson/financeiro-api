const { Model, DataTypes } = require('sequelize')

class List extends Model {
  static init(sequelize) {
    super.init({
      code_list: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      linked_to: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN
      }
    }, {
      sequelize,
      tableName: 'lists',
    })
  }

  static associate(models) {
    this.belongsTo(models.Unity, { foreignKey: 'unity_id',  through: 'lists', as: 'unity' })
    this.belongsToMany(models.Documents, { foreignKey: 'id_list', through: 'list_documents', as: 'documents' })
  }
}

module.exports = List