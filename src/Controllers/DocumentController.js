const Document = require('../Models/Document')
const Creditor = require('../Models/Creditor')
const Unity = require('../Models/Unity')
const User = require('../Models/User')
const Token = require('../Auth/token.auth')

module.exports = {
  async index(req, res) {
    const { code_unity } = req.params

    console.log(code_unity)
    const documents = await Document.findAll({
      include: [
        { 
          model: Creditor, 
          as: 'creditor', 
          attributes: ['code', 'reason']
        },
        { 
          model: Unity, 
          as: 'units', 
          attributes: ['code_unity', 'unity'], 
          through: { 
            attributes: [],  
          }, 
          where: { 
            code_unity 
          }
        },
        { 
          model: User, 
          as: 'users', 
          attributes: ['name', 'last_name', 'code'], 
          through: { 
            attributes: [] 
          }
        }
      ]
    })

    return res.json(documents)
  },

  async store(req, res) {
    const { authorization } = req.headers
    const { unity } = await Token.check(authorization)
    console.log(unity)
    const {
      number,
      emission,
      due,
      value,
      description,
      code,
      reason,
      code_unity,
      code_user
    } = req.body

    const checkUnity = await Unity.findOne({
      where: {
        code_unity
      }
    })

    if (!checkUnity) { 
      return res.status(400).json({ 
        error: 'Código da unidade inexistente' 
      }) 
    }

    const checkUser = await User.findOne({
      where: {
        code_user
      }
    })

    if (!checkUser) { 
      return res.status(400).json({ 
        error: 'User not found' 
      }) 
    }

    const [creditor] = await Creditor.findOrCreate({
      where: {
        code
      },
      defaults: {
        reason
      }
    })

    const [document, created] = await Document.findOrCreate({
      where: {
        creditor_id: creditor.id,
        number,
        emission,
        due,
        value,
      },
      defaults: {
        description
      }
    })


    if(!created) { 
      return res.status(400).json({ 
        error: 'O documento que voçê esta tentando incluir já faz parte do banco de dados.' 
      }) 
    }

    await checkUnity.addDocument(document)
    await checkUser.addUsers(document)

    return res.json(document)
  }
}