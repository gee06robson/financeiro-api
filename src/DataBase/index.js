const Sequelize = require('sequelize')
const dbConfig = require('../Config/database')

const Users = require('../Models/User')
const Unity = require('../Models/Unity')
const List = require('../Models/List')
const Creditors = require('../Models/Creditor')
const Documents = require('../Models/Document')
const AuxiliaryDocument = require('../Models/AuxiliaryDocument')
const BlackList = require('../Models/BlackList')

const connection = new Sequelize(dbConfig)

Users.init(connection)
Unity.init(connection)
List.init(connection)
Creditors.init(connection)
Documents.init(connection)
AuxiliaryDocument.init(connection)
BlackList.init(connection)

Creditors.associate(connection.models)
Documents.associate(connection.models)
Unity.associate(connection.models)
List.associate(connection.models)



module.exports = connection;