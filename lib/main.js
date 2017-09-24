/*!
 * Copyright(c) 2017 Jan Blaha
 *
 * jsreport recipe embedding output html into the docx
 */

const htmlDocx = require('html-docx-js')
const juice = require('juice')
const httpRequest = require('request')
const Promise = require('bluebird')

function preview (request, response, options) {
  return new Promise((resolve, reject) => {
    const req = httpRequest.post(options.publicUriForPreview || 'https://jsreport.net/temp', (err, resp, body) => {
      if (err) {
        return reject(err)
      }

      var iframe = '<iframe style="height:100%;width:100%" src="https://view.officeapps.live.com/op/view.aspx?src=' +
        encodeURIComponent((options.publicUriForPreview || 'https://jsreport.net/temp') + '/' + body) + '" />'
      var title = request.template.name || 'jsreport'
      var html = '<html><head><title>' + title + '</title><body>' + iframe + '</body></html>'
      response.content = Buffer.from(html)
      response.headers['Content-Type'] = 'text/html'
      setTimeout(function () {
        resolve()
      }, 500)
    })

    var form = req.form()
    form.append('file', response.stream)
    response.headers['Content-Type'] = 'text/html'
  })
}

function responseDocx (request, response) {
  let options = request.reporter.options.docx || {}
  if (request.options.preview && options.previewInOfficeOnline !== false) {
    return preview(request, response, options)
  }

  response.headers['Content-Type'] = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  response.headers['Content-Disposition'] = 'inline; filename="report.docx"'
  response.headers['File-Extension'] = 'docx'
}

module.exports = function (reporter, definition) {
  reporter.extensionsManager.recipes.push({
    name: 'html-embedded-in-docx',
    execute: function (request, response) {
      response.content = htmlDocx.asBlob(juice(response.content.toString()))
      responseDocx(request, response)
    }
  })
}
