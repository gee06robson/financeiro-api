const express = require('express')

const User = require('./Controllers/UserController')
const Unity = require('./Controllers/UnityController')
const Creditor = require('./Controllers/CreditorController')
const Document = require('./Controllers/DocumentController')
const middleware = require('./Auth/middleware')
const BlackList = require('./Controllers/BlackListController')
const Role = require('./Controllers/RolesControlles')

const routes = express.Router()

routes.get('/users', middleware, User.index)
routes.post('/user', User.store)
routes.post('/login', User.login)

routes.post('/creditor', middleware, Creditor.store)
routes.post('/one_creditor', Creditor.one)
routes.post('/update', Creditor.update)
routes.get('/creditor', middleware, Creditor.index)

routes.post('/document', Document.store)
routes.get('/document', middleware,Document.index)

routes.post('/unity', Unity.store)
routes.get('/unity', Unity.index)

routes.get('/blacklist', BlackList.index)
routes.post('/blacklist', middleware, BlackList.store)
routes.get('/check', middleware, BlackList.check)

routes.get('/roles', middleware, Role.index)
routes.post('/newrole', Role.store)
routes.post('/addrole', Role.addRoles)


module.exports = routes