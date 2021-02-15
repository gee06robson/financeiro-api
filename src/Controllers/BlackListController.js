const BlackList = require('../Models/BlackList')

module.exports = {
  async index(req, res) {
    const list = await BlackList.findAll()

    return res.json(list)
  },

  async store(req, res) {
    const { authorization } = req.headers
    const [ register ] = await BlackList.findOrCreate({
      where: {
        token: authorization
      }
    })

    return res.json(register)
  },

  async check(req, res) {
    const { authorization } = req.headers

    return await res.json({authorization})
  }
}