const bcrypt = require('bcrypt')

const generate = async (password) => {
  return await bcrypt.hash(password, bcrypt.genSaltSync(10))  
}

const compare = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash)  
}

module.exports = {
  generate,
  compare
}