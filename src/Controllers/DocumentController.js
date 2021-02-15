const Document = require('../Models/Document')
const Creditor = require('../Models/Creditor')

module.exports = {
  async index(req, res) {
    const documents = await Document.findAll({
      include: [
        { model: Creditor, as: 'creditor'}
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
      reason
    } = req.body

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

    return res.json(document)
  }
}