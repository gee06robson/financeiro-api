const User = require('../Models/User')
const Hash = require('../Auth/hash')
const Token = require('../Auth/token.auth')
const { LOGIN_EXPIRATION_TIME } = require('../Auth/settings')


module.exports = {
  async login(req, res) {
    const { code, password } = req.body

    const user = await User.findOne({
      where: {
        code
      }
    })

    if (!user) { return res.status(400).json({ error: 'Erro ao efetuart login' })}

    const released = await Hash.compare(password, user.password)
      if (!released) { return res.status(400).json({ error: 'Erro ao efetuart login' })}

    const JWTData = {
      iss: 'api-financeiro',
      sub: user.id,
      name: 'Financeiro',
      admin: true,
      exp: Math.floor(Date.now() / 1000) + LOGIN_EXPIRATION_TIME
    }

    const token = await Token.generate(JWTData)

    return res.json({token})
  },

  async store(req, res) {
    try {

      const { name, last_name, code, email } = req.body
      let { password } = req.body

      password = await Hash.generate(password)
  
      const [newUser, created] = await User.findOrCreate({
        where: {
          code
        },
        defaults: {
          name, 
          last_name,
          email,
          password,
        }
      })
  
      if (!created) { return res.status(400).json({ error: 'Usuário já registrado'}) }
      
      return res.json(newUser)
      
    } catch (error) {
      return res.json(error)
    }
  }
}