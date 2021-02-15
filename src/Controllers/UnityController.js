const Unity = require('../Models/Unity')

module.exports = {
  async index(req, res  ) {
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