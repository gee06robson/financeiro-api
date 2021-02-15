const JWT = require('jsonwebtoken')
const { ERR_INVALID_TOKEN } = require('../Utils/errorTypes')
const { ALGORITHM } = require('../Auth/settings')

const generate = payload =>  new Promise(resolve => {
  const token = JWT.sign(payload, process.env.SECRET_KEY, { algorithm: ALGORITHM }, (err, token) => {
    if (err) {
      throw new Error(ERR_INVALID_TOKEN)
    }

    resolve(token)
  })

  return token

})

const check = token => new Promise((resolve, reject) => {
  const checked = JWT.verify(token, process.env.SECRET_KEY, { algorithms: ["HS256"] }, (err, decoded) => {
    if (err) {
      reject(err)
    }

    resolve(decoded)
  })  

  return checked
})

module.exports = {
  generate,
  check
}