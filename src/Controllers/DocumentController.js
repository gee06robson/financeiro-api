const Document = require('../Models/Document')
const Creditor = require('../Models/Creditor')
const Unity = require('../Models/Unity')

module.exports = {
  async index(req, res) {
    const documents = await Document.findAll({
      include: [
        { model: Creditor, as: 'creditor'},
        { model: Unity, as: 'units'}
      ] 
    })

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
      code_unity
    } = req.body

    const checkUnity = await Unity.findOne({
      where: {
        code_unity
      }
    })

    if (!checkUnity) { return res.status(400).json({ error: 'Código da unidade inexistente' }) }

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


    if(!created) { return res.status(400).json({ error: 'O documento que voçê esta tentando incluir já faz parte do banco de dados.' }) }

    await checkUnity.addDocument(document)

    return res.json(document)
  }
}