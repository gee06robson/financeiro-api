const Unity = require('../Models/Unity')
const User = require('../Models/User')
const Creditor = require('../Models/Creditor')
const List = require('../Models/List')

module.exports = {
  async index(req, res  ) {
    const units = await Unity.findAll({
      include: [
        { model: User, as: 'users' },
        { association: 'documents', 
        include: [{ model: Creditor, as: 'creditor'}]},
        { model: List, as: 'lists'},
      ]
    })

    return res.json(units)
  },

  async all(req, res  ) {
    const units = await Unity.findAll()

    return res.json(units)
  },

  async store(req, res) {
    const { unity } = req.body

    const [newUnity, created] = await Unity.findOrCreate({
      where: {
        unity
      }
    })

    if(!created) { return res.status(400).json({ error: 'Unidade já registrada' }) }

    return res.json(newUnity)
  }
}