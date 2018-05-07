/*!
 * Copyright(c) 2017 Jan Blaha
 *
 * jsreport recipe embedding output html into the docx
 */

const htmlDocx = require('html-docx-js')
const juice = require('juice')
const httpRequest = require('request')
const Promise = require('bluebird')

function preview (request, response, options, filename) {
  return new Promise((resolve, reject) => {
    const req = httpRequest.post(options.publicUriForPreview || 'https://jsreport.net/temp', (err, resp, body) => {
      if (err) {
        return reject(err)
      }

      const iframe = '<iframe style="height:100%;width:100%" src="https://view.officeapps.live.com/op/view.aspx?src=' +
        encodeURIComponent((options.publicUriForPreview || 'https://jsreport.net/temp') + '/' + body) + '" />'
      const title = request.template.name || 'jsreport'
      const html = '<html><head><title>' + title + '</title><body>' + iframe + '</body></html>'
      response.content = Buffer.from(html)
      response.meta.contentType = 'text/html'
      setTimeout(function () {
        resolve()
      }, 500)
    })

    var form = req.form()
    form.append('file', response.content, { filename })
    response.meta.contentType = 'text/html'
  })
}

function responseDocx (options, request, response) {
  const contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  const fileExtension = 'docx'

  if (request.options.preview && options.previewInOfficeOnline !== false) {
    return preview(request, response, options, `${response.meta.reportName}.${fileExtension}`)
  }

  response.meta.contentType = contentType
  response.meta.fileExtension = fileExtension
}

module.exports = function (reporter, definition) {
  definition.options = Object.assign({}, reporter.options.docx, definition.options)

  reporter.extensionsManager.recipes.push({
    name: 'html-embedded-in-docx',
    execute: function (request, response) {
      response.content = htmlDocx.asBlob(juice(response.content.toString()))
      return responseDocx(definition.options, request, response)
    }
  })
}
