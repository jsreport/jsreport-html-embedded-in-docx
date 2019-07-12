const office = require('jsreport-office')

module.exports = {
  name: 'html-embedded-in-docx',
  main: 'lib/main.js',
  dependencies: ['templates'],
  optionsSchema: office.extendSchema('html-embedded-in-docx', {})
}
