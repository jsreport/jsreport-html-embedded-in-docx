/*!
 * Copyright(c) 2017 Jan Blaha
 *
 * jsreport recipe embedding output html into the docx
 */

const path = require('path')
const { response } = require('jsreport-office')
const extend = require('node.extend.without.arrays')

module.exports = function (reporter, definition) {
  definition.options = extend(true, { preview: {} }, reporter.options.office, definition.options)

  reporter.extensionsManager.recipes.push({
    name: 'html-embedded-in-docx',
    execute: async function (req, res) {
      const result = await reporter.executeScript({
        htmlContent: res.content.toString()
      }, {
        execModulePath: path.join(__dirname, 'scriptHtmlEmbeddedInDocx.js')
      }, req)

      if (result.error) {
        const error = new Error(result.error.message)
        error.stack = result.error.stack

        throw reporter.createError('Error while signing pdf', {
          original: error,
          weak: true
        })
      }

      return response({
        previewOptions: definition.options.preview,
        officeDocumentType: 'docx',
        buffer: Buffer.from(result.docxContent, 'base64')
      }, req, res)
    }
  })

  reporter.initializeListeners.add(definition.name, () => {
    if (reporter.express) {
      reporter.express.exposeOptionsToApi(definition.name, {
        preview: {
          enabled: definition.options.preview.enabled,
          showWarning: definition.options.preview.showWarning
        }
      })
    }
  })
}
