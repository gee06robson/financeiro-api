const Sequelize = require('sequelize')
const dbConfig = require('../Config/database')

const Users = require('../Models/User')
const Unity = require('../Models/Unity')
const Creditors = require('../Models/Creditor')
const Documents = require('../Models/Document')
const BlackList = require('../Models/BlackList')
const Role = require('../Models/Role')
const Taxes = require('../Models/Taxes')
const taxesDocuments = require('../Models/taxes_documents')
const listsDocuments = require('../Models/list_document')
const List = require('../Models/List')
const DocumentsSIAFI = require('../Models/DocumentsSIAFI')

const connection = new Sequelize(process.env.DATABASE_URL, dbConfig.production)

Users.init(connection)
Unity.init(connection)
Creditors.init(connection)
Documents.init(connection)
BlackList.init(connection)
Role.init(connection)
Taxes.init(connection)
taxesDocuments.init(connection)
listsDocuments.init(connection)
List.init(connection)
DocumentsSIAFI.init(connection)

Creditors.associate(connection.models)
Documents.associate(connection.models)
Unity.associate(connection.models)
Users.associate(connection.models)
Role.associate(connection.models)
Taxes.associate(connection.models)
List.associate(connection.models)
DocumentsSIAFI.associate(connection.models)


module.exports = connection;