const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const dotenv = require('dotenv')
 
require('./DataBase')

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use(routes)

app.listen(process.env.PORT || 3333)