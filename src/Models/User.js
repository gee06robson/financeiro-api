const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcrypt')

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
}

module.exports = User