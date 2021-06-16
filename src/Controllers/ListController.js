const List = require('../Models/List')
const Unity = require('../Models/Unity')
const Document = require('../Models/Document')
const Creditor = require('../Models/Creditor')
const Taxes = require('../Models/Taxes')
const DocumentsSIAFI = require('../Models/DocumentsSIAFI')

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

  async oneReduced(req, res) {
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
    })

    if (!list) return res.status(400).json({ error: 'lista não encontrada' })

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
            },
            {
              model: DocumentsSIAFI,
              as: 'documents_SIAFI',
              attributes: ['year', 'document', 'number'],
              through: {
                attributes: []
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

  async update(req, res) {
    const { 
      linked_to,
      title,
      description,
      authentication,
      occupation
    } = req.body

    const {
      code_list, 
      code_unity
    } = req.params

    const checkList = await List.findOne({
      where: {
        code_list
      }
    })

    if (!checkList) return res.status(400).json({ 
      error: 'lista não encontrada' 
    })

    const checkUnit = await Unity.findOne({
      where: {
        code_unity
      }
    })

    if (!checkUnit) return res.status(400).json({ 
      error: 'unidade não encontrada' 
    })

    checkList.linked_to = linked_to
    checkList.title = title
    checkList.description = description
    checkList.authentication = authentication
    checkList.occupation = occupation

    await checkList.save()
    await checkList.reload()

    return res.json(checkList)
  },

  async addDocument(req, res) {
    const { 
      code_list, 
      id_document,
      status } = req.body
    
    const checkList = await List.findOne({
      where: {
        code_list
      }
    })
    
    const checkDocument = await Document.findByPk(id_document)

    if (!checkList || !checkDocument) return res.status(400).json({ error: 'associação negada' })

    await checkList.addDocuments(checkDocument, { 
      through: { 
        status 
      } 
    })

    return res.json(checkDocument)
  },

  async removeDocument(req, res) {
    const { code_list, id_document } = req.body

    const checkDocument = await Document.findByPk(id_document)
    const checkList = await List.findOne({
      where: {
        code_list
      }
    })
    if (!checkList || !checkDocument) return res.status(400).json({ error: 'desassociação negada' })

    await checkList.removeDocuments(checkDocument)

    return res.status(200).json({ success: 'desassociação bem sucedida' })

  }
}