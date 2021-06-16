const DocumentsSIAFI = require('../Models/DocumentsSIAFI')
const Document = require('../Models/Document')

module.exports = {
  async store(req, res) {
    const { 
      year,
      document,
      number,
      document_date,
      document_id
    } = req.body

    const [ newDocument, created ] = await DocumentsSIAFI.findOrCreate({
      where: {
        year,
        document,
        number
      },
      defaults: {
        document_date
      }
    })

    if (document_id) {
      const checkDocument = await Document.findByPk(document_id)
       if (!checkDocument) return res.status(400).json({ error: 'erro ao vincular documento' })

      await newDocument.addDocuments(checkDocument)
    }

    return res.json(newDocument)
  },

  async removeDocument(req, res) {
    const { id_DocumentSIAFI, document_id } = req.body

    const checkDocument = await Document.findByPk(document_id)
    const checkDocumentSIAFI = await DocumentsSIAFI.findByPk(id_DocumentSIAFI)

    if (!checkDocument || !checkDocumentSIAFI) return res.status(400).json({ error: 'erro ao desvincular documento' })

    await checkDocumentSIAFI.removeDocuments(checkDocument)

    return res.status(200).json({ success: 'documento removido' })
  }
}