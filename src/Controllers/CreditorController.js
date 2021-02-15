const Creditor = require('../Models/Creditor')

module.exports = {
  async index(req, res) {
    const creditors = await Creditor.findAll()

    return res.json(creditors)
  },

  async one(req, res) {
    const { code } = req.body
    const creditor = await Creditor.findOne({
      where: {
        code
      }
    })

    if (!creditor) { return res.status(400).json({ error: 'Credor não localizado' }) }

    return res.json(creditor)
  },

  async store(req, res) {
    const { code, reason } = req.body

    const [ creditor, created ] = await Creditor.findOrCreate({
      where: {
        code
      },
      defaults: {
        reason
      }
    })

    if(!created) { return res.status(400).json({ error: 'Credor já resgistrado' }) }

    return res.json(creditor)
  },

  async update(req, res) {
    const { code, reason } = req.body

    const creditor = await Creditor.findOne({
      where: {
        code
      }
    })

    if(!creditor) { return res.status(400).json({ error: 'Credor não localizado' })}
    if(creditor.reason === reason) { return res.status(400).json({ error: 'Não há alteração a ser processada' })}

          creditor.reason = reason
    await creditor.save()

    return res.json(creditor)
  }
}