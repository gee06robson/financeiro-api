const express = require('express')

const User = require('./Controllers/UserController')
const Unity = require('./Controllers/UnityController')
const Creditor = require('./Controllers/CreditorController')
const Document = require('./Controllers/DocumentController')
const middleware = require('./Auth/middleware')
const BlackList = require('./Controllers/BlackListController')
const Role = require('./Controllers/RolesControlles')
const Taxes = require('./Controllers/TaxesController')
const List = require('./Controllers/ListController')
const DocumentsSIAFI = require('./Controllers/DocumentsSIAFIController')

const routes = express.Router()

routes.post('/login', User.login)
routes.get('/allunits', Unity.all)
routes.post('/teste', User.teste)
routes.post('/user', User.store)
routes.post('/unity', Unity.store)

routes.use(middleware)

routes.get('/users', User.index)

routes.post('/creditor', Creditor.store)
routes.post('/one_creditor', Creditor.one)
routes.post('/update', Creditor.update)
routes.get('/creditor', Creditor.index)

routes.post('/document/:code_list', Document.store)
routes.get('/document/:code_unity', Document.index)
routes.post('/update_document', Document.one)
routes.post('/edit_document', Document.update)
routes.post('/delete_document', Document.delete)

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

routes.get('/lists/:code_unity', List.index)
routes.get('/list_reduced/:code_unity/:code_list', List.oneReduced)
routes.get('/one_list/:code_unity/:code_list', List.one)
routes.post('/newlist', List.store)
routes.post('/update_list/:code_unity/:code_list', List.update)
routes.post('/add_document', List.addDocument)
routes.post('/remove_document', List.removeDocument)

routes.post('/new_document_siafi', DocumentsSIAFI.store)
routes.post('/remove_document_siafi', DocumentsSIAFI.removeDocument)
module.exports = routes