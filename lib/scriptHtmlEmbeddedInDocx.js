const htmlDocx = require('html-docx-js')
const juice = require('juice')

module.exports = async (inputs, callback, done) => {
  try {
    done(null, {
      docxContent: htmlDocx.asBlob(juice(inputs.htmlContent)).toString('base64')
    })
  } catch (e) {
    done(null, {
      error: {
        message: e.message,
        stack: e.stack
      }
    })
  }
}
