const express = require('express')

const User = require('./Controllers/UserController')
const Unity = require('./Controllers/UnityController')
const Creditor = require('./Controllers/CreditorController')
const Document = require('./Controllers/DocumentController')
const middleware = require('./Auth/middleware')
const BlackList = require('./Controllers/BlackListController')
const Role = require('./Controllers/RolesControlles')

const routes = express.Router()

routes.post('/login', User.login)
routes.get('/allunits', Unity.all)

routes.use(middleware)

routes.get('/users', User.index)
routes.post('/user', User.store)

routes.post('/creditor', Creditor.store)
routes.post('/one_creditor', Creditor.one)
routes.post('/update', Creditor.update)
routes.get('/creditor', Creditor.index)

routes.post('/document', Document.store)
routes.get('/document', Document.index)

routes.post('/unity', Unity.store)
routes.get('/unity', Unity.index)

routes.get('/blacklist', BlackList.index)
routes.post('/blacklist', BlackList.store)
routes.get('/check', BlackList.check)

routes.get('/roles', Role.index)
routes.post('/newrole', Role.store)
routes.post('/addrole', Role.addRoles)


module.exports = routes