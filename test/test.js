const JsReport = require('jsreport-core')
require('should')

describe('html-embedded-in-docx', () => {
  let jsreport

  beforeEach(() => {
    jsreport = JsReport()
    jsreport.use(require('../')())
    return jsreport.init()
  })

  it('should produce docx', async () => {
    const res = await jsreport.render({
      template: {
        content: 'Hello',
        engine: 'none',
        recipe: 'html-embedded-in-docx'
      }
    })

    res.content.toString().should.containEql('openxmlformats')
  })
})
