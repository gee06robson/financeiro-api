const Taxes = require('../Models/Taxes')
const Document = require('../Models/Document')

module.exports = {
  async index(req, res) {
    const taxes = await Taxes.findAll()

    if (!taxes) return res.status(400).json({ error: 'impostos não encontrados' })
 
    return res.json(taxes)
  },

  async store(req, res) {
    const {
      code, 
      ir,
      csll,
      cofins,
      pis_pasep,
      iss,
      percentage,
      description
    } = req.body

    const [newTaxes, created] = await Taxes.findOrCreate({
      where: {
        code,
        percentage
      },
      defaults: {
        ir,
        csll,
        cofins,
        pis_pasep,
        iss,
        description
      }
    })

    if (!created) return res.status(400).json({ error: 'imposto informado já existe' })

    return res.json(newTaxes)
  },

  async update(req, res) {
    const { 
      id, 
      code,
      ir,
      csll,
      cofins,
      pis_pasep,
      iss,
      percentage,
      description 
    } = req.body

    const tax = await Taxes.findByPk(id)

    if (!tax) return res.status(400).json({ error: 'informação não localizada' })

      tax.code = code,
      tax.ir = ir,
      tax.csll = csll,
      tax.cofins = cofins,
      tax.pis_pasep = pis_pasep,
      tax.iss = iss,
      tax.percentage = percentage,
      tax.description =description

      tax.save()
      tax.reload()

    return res.status(200).json({ success: 'alteração realizada com sucesso' })
  },

  async applyTax(req, res) {
    const { 
      id_document, 
      code, 
      percentage, 
      calculation,   
    } = req.body
    
    const document = await Document.findByPk(id_document)
     if (!document) return res.status(400).json({ error: 'documento não localizado' })
    
    const [retention, created] = await Taxes.findOrCreate({
      where: {
        code,
        percentage
      }
    })

    console.log(created)

    await document.addRetentions(retention, { through: { calculation } })

    return res.status(200).json({ success: 'imposto aplicado' })
  },

  async delete(req, res) {
    const { id_document, id_retention } = req.params

    const document = await Document.findByPk(id_document)
    
    const retention = await Taxes.findByPk(id_retention)

    if (!document || !retention) { return res.status(400).json({ error: 'Documento ou Retenção não encontrado' }) }

    await document.removeRetentions(retention)

    return res.status(200).json({ success: 'imposto removido' })

  }
}