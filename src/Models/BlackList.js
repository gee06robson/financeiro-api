const { Model, DataTypes } = require('sequelize')

class BlackList extends Model {
  static init(sequelize) {
    super.init({
      token: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'blacklist'
    })
  }
}

module.exports = BlackList