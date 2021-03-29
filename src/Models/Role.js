const { Model, DataTypes } = require('sequelize')

class Role extends Model {
  static init(sequelize) {
    super.init({
      code_role: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      role: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'roles',
    })
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'id_role', through: 'users_roles', as: 'users' })
  }
}

module.exports = Role