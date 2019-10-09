/*!
 * Copyright(c) 2017 Jan Blaha
 *
 * jsreport recipe embedding output html into the docx
 */

const htmlDocx = require('html-docx-js')
const juice = require('juice')
const { response } = require('jsreport-office')
const extend = require('node.extend.without.arrays')

module.exports = function (reporter, definition) {
  definition.options = extend(true, { preview: {} }, reporter.options.office, definition.options)

  reporter.extensionsManager.recipes.push({
    name: 'html-embedded-in-docx',
    execute: function (req, res) {
      return response({
        previewOptions: definition.options.preview,
        officeDocumentType: 'docx',
        buffer: htmlDocx.asBlob(juice(res.content.toString()))
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
