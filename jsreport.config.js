
const schema = {
  type: 'object',
  properties: {
    previewInOfficeOnline: { type: 'boolean' },
    publicUriForPreview: { type: 'string' }
  }
}

module.exports = {
  'name': 'html-embedded-in-docx',
  'main': 'lib/main.js',
  'dependencies': ['templates'],
  'optionsSchema': {
    docx: { ...schema },
    extensions: {
      'html-embedded-in-docx': { ...schema }
    }
  }
}
