/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jsreportStudio = __webpack_require__(1);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_jsreportStudio2.default.previewListeners.push(function (request, entities) {
	  if (request.template.recipe !== 'html-embedded-in-docx') {
	    return;
	  }
	
	  if (_jsreportStudio2.default.extensions['html-embedded-in-docx'].options.previewInOfficeOnline === false) {
	    return;
	  }
	
	  if (_jsreportStudio2.default.getSettingValueByKey('office-preview-informed', false) === true) {
	    return;
	  }
	
	  _jsreportStudio2.default.setSetting('office-preview-informed', true);
	
	  _jsreportStudio2.default.openModal(function () {
	    return React.createElement(
	      'div',
	      null,
	      'We need to upload your report to our publicly hosted server to be able to use Office Online Service for previewing here in the studio. You can disable it in the configuration, see',
	      React.createElement(
	        'a',
	        { href: 'https://github.com/jsreport/jsreport-html-embedded-in-docx', target: '_blank' },
	        'https://github.com/jsreport/jsreport-html-embedded-in-docx'
	      ),
	      ' for details.'
	    );
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ }
/******/ ]);