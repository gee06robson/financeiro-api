const AuxiliaryDocument = require('../Models/AuxiliaryDocument')

 module.exports = {
   async index(req, res) {
    const document = await AuxiliaryDocument.findAll()

    return res.json(document)
   },

   async store(req, res) {
    const { type, number } = req.body

    const [document, created] = await AuxiliaryDocument.findOrCreate({
      where: {
        type,
        number
      }
    })

    if(!created) { return res.status(400).json({ error: `${number} já exite` }) }

    return res.json(document)
   }
 }