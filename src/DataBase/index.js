const Sequelize = require('sequelize')
const dbConfig = require('../Config/database')

const Users = require('../Models/User')
const Unity = require('../Models/Unity')
const Creditors = require('../Models/Creditor')
const Documents = require('../Models/Document')
const BlackList = require('../Models/BlackList')
const Role = require('../Models/Role')

const connection = new Sequelize('postgres://qtntaskfgaeqxl:9c8d7102604faa4a4a23b6e28c394792de87e02d32c13cdede7b2d4fe53a9105@ec2-34-225-103-117.compute-1.amazonaws.com:5432/dbbptngp9j3t9k', dbConfig)

Users.init(connection)
Unity.init(connection)
Creditors.init(connection)
Documents.init(connection)
BlackList.init(connection)
Role.init(connection)

Creditors.associate(connection.models)
Documents.associate(connection.models)
Unity.associate(connection.models)
Users.associate(connection.models)
Role.associate(connection.models)


module.exports = connection;