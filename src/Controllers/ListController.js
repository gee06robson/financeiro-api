const List = require('../Models/List')
const Unity = require('../Models/Unity')
const Document = require('../Models/Document')
const Creditor = require('../Models/Creditor')
const Taxes = require('../Models/Taxes')

module.exports = {
  async index(req, res) {
    const { code_unity } = req.params
    
    const list = await List.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [
        { 
          model: Unity, 
          as: 'unity',
          where: { 
            code_unity 
          }
        },
        {
          model: Document,
          as: 'documents'
        }
      ]
    })

    if (!list) return res.status(400).json({ error: 'listas não encontradas' })

    return res.json(list)
  },

  async one(req, res) {
    const {
      code_list, 
      code_unity
    } = req.params

    const checkUnit = await Unity.findOne({
      where: {
        code_unity
      }
    })

    if (!checkUnit) return res.status(400).json({ error: 'unidade não encontrada' })

    const list = await List.findOne({
      where: {
        code_list
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [
        { 
          model: Unity, 
          as: 'unity',
          where: { 
            code_unity 
          }
        },
        {
          model: Document,
          association: 'documents', 
          include: [
            { 
              model: Creditor, 
              as: 'creditor'
            },
            { 
              model: Taxes, 
              as: 'retentions',
              through: {
                attributes: ['calculation']
              }
            }
          ],
        },
      ]
    })

    if (!list) return res.status(400).json({ error: 'listas não encontradas' })

    return res.json(list)
  },

  async store(req, res) {
    const { 
      linked_to,
      title,
      description,
      status, 
      code_unity } = req.body
      
    const checkUnit = await Unity.findOne({
      where: {
        code_unity
      }
    })

    if (!checkUnit) return res.status(400).json({ error: 'unidade não encontrada' })

    const newList = await List.create({
      linked_to,
      title,
      description,
      status,
      unity_id: checkUnit.id
    })

    return res.json(newList)
  },

  async addDocument(req, res) {
    const { 
      id_list, 
      id_document,
      status } = req.body
    
    const checkList = await List.findByPk(id_list)
    const checkDocument = await Document.findByPk(id_document)

    if (!checkList || !checkDocument) return res.status(400).json({ error: 'associação negada' })

    await checkList.addDocuments(checkDocument, { 
      through: { 
        status 
      } 
    })

    return res.json(checkDocument)
  }
}