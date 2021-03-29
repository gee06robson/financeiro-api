const Role = require('../Models/Role')
const User = require('../Models/User')

module.exports = {
  async index(req, res) {
    const roles = await Role.findAll({
      include: [
        { model: User, as: 'users' },
      ]
    })

    return res.json(roles) 
  },

  async store(req, res) {
    const { role, description } = req.body

    const [newRole, create] = await Role.findOrCreate({
      where: {
        role
      },
      defaults: {
        description
      }
    })

    if (!create) { return res.status(400).json({ error: 'Perfil existente' }) }

    return res.json(newRole)
  },

  async addRoles(req, res) {
    const { id_role, id_user } = req.body

    const user = await User.findByPk(id_user)
     if (!user) { return res.status(400).json({ error: 'Erro ao associar perfil' }) }

    const role = await Role.findByPk(id_role)
     if (!role) { return res.status(400).json({ error: 'Erro ao associar perfil' }) }

    await user.addRole(role)

    return res.json(user)
  }
}