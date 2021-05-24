const express = require('express')

const User = require('./Controllers/UserController')
const Unity = require('./Controllers/UnityController')
const Creditor = require('./Controllers/CreditorController')
const Document = require('./Controllers/DocumentController')
const middleware = require('./Auth/middleware')
const BlackList = require('./Controllers/BlackListController')
const Role = require('./Controllers/RolesControlles')
const Taxes = require('./Controllers/TaxesController')

const routes = express.Router()

routes.post('/login', User.login)
routes.get('/allunits', Unity.all)
routes.post('/teste', User.teste)

routes.use(middleware)

routes.get('/users', User.index)
routes.post('/user', User.store)

routes.post('/creditor', Creditor.store)
routes.post('/one_creditor', Creditor.one)
routes.post('/update', Creditor.update)
routes.get('/creditor', Creditor.index)

routes.post('/document', Document.store)
routes.get('/document/:code_unity', Document.index)
routes.post('/update_document', Document.one)
routes.post('/edit_document', Document.update)
routes.post('/delete_document', Document.delete)

routes.post('/unity', Unity.store)
routes.get('/unity', Unity.index)

routes.get('/blacklist', BlackList.index)
routes.post('/blacklist', BlackList.store)
routes.get('/check', BlackList.check)

routes.get('/roles', Role.index)
routes.post('/newrole', Role.store)
routes.post('/addrole', Role.addRoles)

routes.get('/taxes', Taxes.index)
routes.post('/addnewtax', Taxes.store)
routes.post('/updatetax', Taxes.update)
routes.post('/apply_tax', Taxes.applyTax)
routes.delete('/delete_taxes/:id_document/:id_retention', Taxes.delete)


module.exports = routes