(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scrype"] = factory();
	else
		root["scrype"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_scrype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/scrype */ \"./src/scrype.js\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (_src_scrype__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://scrype/./index.js?");

/***/ }),

/***/ "./src/replacer/javascript.js":
/*!************************************!*\
  !*** ./src/replacer/javascript.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(code){code=code.replace(/class (\\w+)/g,function replacer(match,p1,p2,p3,offset,string){return`<span style=\"color: #ffe538;\">class</span> <span style='color: #ca7eff;'>${p1}</span>`;});code=code.replace('class ','<span style=\"color: #ffe538;\">class</span>');var re=new RegExp(/(\\w+) \\(\\)/,'g');code=code.replace(re,function replacer(match,p1,p2,p3,offset,string){return`<span style='color: #ca7eff;'>${p1} </span>()`;});code=code.replace('let ','<span style=\"color: #ffe538;\">let </span>');return code;});\n\n//# sourceURL=webpack://scrype/./src/replacer/javascript.js?");

/***/ }),

/***/ "./src/scrype.js":
/*!***********************!*\
  !*** ./src/scrype.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Scrype; });\n/* harmony import */ var _replacer_javascript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replacer/javascript */ \"./src/replacer/javascript.js\");\nclass Scrype{constructor(selector,{code=\"null\",onProgress=()=>{},codeContainerSelector=null,position='top',pixelPerStep=20,padding=0,removeCharacter='~'}){let ele=typeof selector==='string'?document.querySelector(selector):selector;let noMore=false;function replaceCode(c,character){var index=c.indexOf(character);while(index!==-1){c=c.slice(0,index-1)+c.slice(index+1);index=c.indexOf(character);}return c;}// onscroll callback\nfunction onScroll(){currentStep=Math.max(window.pageYOffset-container.offsetTop,0);var pos=Math.floor(currentStep/pixelPerStep);if(pos>code.length){if(!noMore){var chars=Object(_replacer_javascript__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(replaceCode(code,'~'));codeEle.innerHTML='> '+chars+'_';onProgress(100);noMore=true;}}else{noMore=false;var chars=Object(_replacer_javascript__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(replaceCode(code.slice(0,pos),'~'));onProgress(Math.round(pos/code.length*100));codeEle.innerHTML='> '+chars+'_';}}function setItemPosition(){switch(position){case'center':item.style.cssText=`position: sticky;position: -webkit-sticky;top: calc(50% - ${item.clientHeight/2}px);`;break;case'bottom':item.style.cssText=`position: sticky;position: -webkit-sticky;top: calc(100% - ${item.clientHeight+50}px);`;break;case'top':item.style.cssText=`position: sticky;position: -webkit-sticky;top: 0;);`;break;default:item.style.cssText=`position: sticky;position: -webkit-sticky;top: 0;);`;break;}}let totalPixel=code.length*pixelPerStep;let currentStep=0;let lastPos=0;// create container\nlet container=document.createElement(\"div\");container.className='scrype__container';// create sticky item\nlet item=document.createElement(\"div\");item.className='scrype__item';item.innerHTML=ele.innerHTML;// create snippet container\nlet snippet=document.createElement(\"div\");snippet.className='scrype__snippet';snippet.style.cssText=\"border-radius: 6px;padding: 16px;background: black;font-family: SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;\";// create code container\nlet codeContainer=document.createElement('div');codeContainer.style.cssText=\"position: relative;\";// create code element\nlet codeEle=document.createElement(\"code\");codeEle.style.cssText=\"color: white;white-space: pre;position: absolute; top: 0; left: 0;right: 0;bottom: 0;\";// create code placeholder element\nlet placeholder=document.createElement(\"code\");placeholder.style.cssText=\"white-space: pre;opacity: 0;\";placeholder.innerHTML=replaceCode(code,'~');// setup element\ncodeContainer.appendChild(placeholder);codeContainer.appendChild(codeEle);snippet.appendChild(codeContainer);if(codeContainerSelector){setTimeout(()=>{let c=document.querySelector(codeContainerSelector);c.appendChild(snippet);},0);}else item.appendChild(snippet);container.appendChild(item);ele.innerHTML='';ele.appendChild(container);container.style.height=window.innerHeight+totalPixel+padding;// Event Listeners\nsetItemPosition();window.addEventListener('scroll',onScroll);onScroll();}};\n\n//# sourceURL=webpack://scrype/./src/scrype.js?");

/***/ })

/******/ });
});