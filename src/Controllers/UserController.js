const User = require('../Models/User')
const Unity = require('../Models/Unity')
const Hash = require('../Auth/hash')
const Token = require('../Auth/token.auth')
const Role = require('../Models/Role')
const { LOGIN_EXPIRATION_TIME } = require('../Auth/settings')


module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'last_name', 'code', 'email', 'code_user', 'status'],
      include: [
        { 
          model: Unity, 
          as: 'units', 
          attributes: ['id', 'unity', 'code_unity', 'records', 'status'], 
          through: { 
            attributes: [] 
          } 
        },
        { 
          model: Role,  
          as: 'roles', 
          attributes: ['id', 'role', 'description'], 
          through: { 
            attributes: [] 
          } 
        }
      ]
    })

    return res.json(users)
  },

  async login(req, res) {
    const { code, password, unity } = req.body

    const user = await User.findOne({
      where: {
        code
      },
      include: [
        { 
          model: Unity, 
          as: 'units', 
          attributes: ['unity', 'code_unity'], 
          through: { 
            attributes: [] 
          }, 
          where: {
            code_unity: unity.value
          }
        },
        { 
          model: Role,  
          as: 'roles', 
          attributes: ['id', 'role'], 
          through: { 
            attributes: [] 
          } 
        }
      ]
    })


    if (!user) { return res.status(400).json({ error: 'Erro ao efetuart login' })}

    const released = await Hash.compare(password, user.password)
      if (!released) { return res.status(400).json({ error: 'Erro ao efetuart login' })}

    const JWTData = {
      iss: 'api-financeiro',
      sub: [{
        name: user.name, 
        lastName: user.last_name, 
        codeUser: user.code_user
      }],
      unity: [{
        unity: user.units[0].unity, 
        codeUnity: user.units[0].code_unity
      }],
      roles: user.roles,
      exp: Math.floor(Date.now() / 1000) + LOGIN_EXPIRATION_TIME,
      iat: Math.floor(Date.now() / 1000)
    }

    const token = await Token.generate(JWTData)

    return res.json({token})
  },

  async store(req, res) {
    const { unity } = req.body

    const checkUnity = await Unity.findOne({
      where: {
        code_unity: unity.value
      }
    })

    if (!checkUnity) { return res.status(400).json({ error: 'Código da unidade inexistente' }) }

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
      await checkUnity.addUser(newUser)
      
      return res.json(newUser)
      
    } catch (error) {
      return res.json(error)
    }
  },

  async teste(req, res) {
    console.log(req.body)
  }
}