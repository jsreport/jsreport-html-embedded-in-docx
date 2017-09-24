# jsreport-html-embedded-in-docx

[![NPM Version](http://img.shields.io/npm/v/jsreport-html-embedded-in-docx.svg?style=flat-square)](https://npmjs.com/package/jsreport-html-embedded-in-docx)
[![Build Status](https://travis-ci.org/jsreport/jsreport-html-embedded-in-docx.png?branch=master)](https://travis-ci.org/jsreport/jsreport-html-embedded-in-docx)

> jsreport recipe which takes the output html and embed it into the docx file

See the docs https://jsreport.net/learn/html-embedded-in-docx

## Installation

>npm install jsreport-html-embedded-in-docx

## jsreport-core

You can apply this extension also manually to [jsreport-core](https://github.com/jsreport/jsreport-core)

```js
const jsreport = require('jsreport-core')()
jsreport.use(require('jsreport-html-embedded-in-docx')())

await jsreport.init()
const response = await jsreport.render({
  template: {
    content: "<h1>Hello</h1>",
    recipe: "html-embedded-in-docx",
    engine: "none"
  }
})
```
