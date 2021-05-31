const Document = require('../Models/Document')
const Creditor = require('../Models/Creditor')
const Unity = require('../Models/Unity')
const User = require('../Models/User')
const Taxes = require('../Models/Taxes')
const List = require('../Models/List')

module.exports = {
  async index(req, res) {
    const { code_unity } = req.params

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
        },
        {
          model: Taxes,
          as: 'retentions',
          attributes: ['code', 'percentage'],
          through: {
            attributes: ['calculation']
          }
        }
      ]
    })

    return res.json(documents)
  },

  async one(req, res) {
    const { code_unity, id } = req.body

    const documents = await Document.findOne({
      where: {
        id
      },
      include: [
        { 
          model: Creditor, 
          as: 'creditor', 
          attributes: ['id', 'code', 'reason']
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
        },
        {
          model: Taxes,
          as: 'retentions',
          attributes: ['id', 'code', 'percentage'],
          through: {
            attributes: ['calculation']
          }
        }
      ]
    })

    if (!documents) { return res.status(400).json({ error: 'Error 400 -- Document not found' }) }

    return res.json(documents)
  },

  async store(req, res) {
    const {
      number,
      emission,
      due,
      value,
      description,
      code,
      reason,
      code_unity,
      code_user,
    } = req.body

    const { code_list } = req.params

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
        value,
      },
      defaults: {
        description,
        due
      }
    })


    if(!created) { 
      return res.status(400).json({ 
        error: 'O documento que voçê esta tentando incluir já faz parte do banco de dados.' 
      }) 
    }

    if (code_list!=="undefined") {
      const checkList = await List.findOne({
        where: {
          code_list
        }
      })
  
      if (!checkList) 
        return res.status(400).json({ 
          error: 'associação negada: lista informada não existe' 
        }) 

      await checkList.addDocuments(document)
    }

    await checkUnity.addDocument(document)
    await checkUser.addUsers(document)

    return res.json(document)
  },

  async update(req, res) {
    const {
      id,
      number,
      emission,
      due,
      value,
      description,
    } = req.body

    const document = await Document.findByPk(id)

          document.number      = number
          document.emission    = emission
          document.due         = due
          document.value       = value
          document.description = description
    
    await document.save()
    await document.reload()
    
    return res.json(document)
  },

  async delete(req, res) {
    const { id } = req.body

    const document = await Document.findByPk(id)

    if (!document) return res.status(400).json({ error: 'Document not found' })

    await document.destroy()

    return res.status(200).json({ success: 'Document deleted' })
  }
}