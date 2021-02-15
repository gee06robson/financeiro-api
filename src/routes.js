const express = require('express')

const User = require('./Controllers/UserController')
const Unity = require('./Controllers/UnityController')
const List = require('./Controllers/ListController')
const Creditor = require('./Controllers/CreditorController')
const Document = require('./Controllers/DocumentController')
const AuxiliaryDocument = require('./Controllers/AuxiliaryDocumentController')
const middleware = require('./Auth/middleware')
const BlackList = require('./Controllers/BlackListController')

const routes = express.Router()


routes.post('/user', User.store)
routes.post('/login', User.login)

routes.post('/creditor', middleware, Creditor.store)
routes.post('/one_creditor', Creditor.one)
routes.post('/update', Creditor.update)
routes.get('/creditor', middleware, Creditor.index)

routes.post('/document', Document.store)
routes.get('/document', Document.index)

routes.post('/unity', Unity.store)
routes.get('/unity', Unity.index)

routes.post('/list', List.store)
routes.get('/list', List.index)

routes.post('/documentaux', AuxiliaryDocument.store)
routes.get('/documentaux', AuxiliaryDocument.index)

routes.get('/blacklist', BlackList.index)
routes.post('/blacklist', middleware, BlackList.store)
routes.get('/check', middleware, BlackList.check)


module.exports = routes