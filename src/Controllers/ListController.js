const List = require('../Models/List')
const Unity = require('../Models/Unity')


module.exports = {
  async index(req, res) {
    const lists = await List.findAll({
      include: [
        { model: Unity, as: 'unity' }
      ]
    })

    return res.json(lists)
  },

  async store(req, res) {
    const { 
      type,
      description,
      id_unity,
    } = req.body

    const checkSender = await Unity.findByPk(id_unity)
      if(!checkSender) { return res.status(400).json({ error: 'Remetente informado não existe' }) }


    const list = await List.create({
      type,
      id_unity: checkSender.id,
      description
    })

    return res.json(list)
    
  }
}