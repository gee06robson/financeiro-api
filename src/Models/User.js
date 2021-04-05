const { DataTypes, Model } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({
      code_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nome não pode ser vazio"
          }
        }
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Sobrenome não pode ser vazio"
          }
        }
      },
      code: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [11, 11],
            msg: "Use como código seu CPF"
          },
          notEmpty: {
            msg: "Código não pode ser vazio"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "E-mail inválido"
          },
          notEmpty: {
            msg: "E-mail não pode ser vazio"
          }
        }
      },
      status: DataTypes.BOOLEAN,
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8],
            msg: "A senha deve conter no mínimo 8 caracteres"
          },
          notEmpty: {
            msg: "Senha não pode ser vazia"
          }
        }
      },
    }, {
      sequelize,
      tableName: 'users',
    })
  }

  static associate(models) {
    this.belongsToMany(models.Unity, { foreignKey: 'id_user', through: 'unity_user', as: 'units' })
    this.belongsToMany(models.Role, { foreignKey: 'id_user', through: 'users_roles', as: 'roles' })
    this.belongsToMany(models.Documents, { foreignKey: 'id_user', through: 'user_document', as: 'users' })
  }
}

module.exports = User