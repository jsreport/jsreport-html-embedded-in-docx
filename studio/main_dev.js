import Studio from 'jsreport-studio'

Studio.previewListeners.push((request, entities) => {
  if (request.template.recipe !== 'html-embedded-in-docx') {
    return
  }

  if (Studio.extensions.html.options.previewInWordOnline === false) {
    return
  }

  if (Studio.getSettingValueByKey('docx-preview-informed', false) === true) {
    return
  }

  Studio.setSetting('docx-preview-informed', true)

  Studio.openModal(() => <div>We need to upload your report to our publicly hosted server to be able to use
    Office Online Service for previewing here in the studio. You can disable it in the configuration, see <a
      href='https://github.com/jsreport/jsreport-html-embedded-in-docx' target='_blank'>https://github.com/jsreport/jsreport-html-embedded-in-docx</a> for details.
  </div>)
})
