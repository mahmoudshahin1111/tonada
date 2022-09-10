/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/packages/tonada-core/index.ts":
/*!*******************************************!*\
  !*** ./src/packages/tonada-core/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tonada = void 0;
var tonada_1 = __webpack_require__(/*! ./src/tonada */ "./src/packages/tonada-core/src/tonada.ts");
Object.defineProperty(exports, "Tonada", ({ enumerable: true, get: function () { return tonada_1.Tonada; } }));


/***/ }),

/***/ "./src/packages/tonada-core/src/tonada.ts":
/*!************************************************!*\
  !*** ./src/packages/tonada-core/src/tonada.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tonada = void 0;
var Tonada = /** @class */ (function () {
    function Tonada(components) {
        this.components = components;
    }
    Tonada.prototype.create = function (componentName, element, config) {
        try {
            var component = this.components.find(function (n) { return n.name.toLowerCase() === componentName.toLowerCase(); });
            if (!component) {
                throw console.error("Make sure you had imported the package by add the proper <script> tag for ".concat(componentName));
            }
            return component.componentClass.create(element, config);
        }
        catch (e) {
            console.error("something wrong please report about the issue on https://github.com/mahmoudshahin1111/tonada", e);
        }
    };
    return Tonada;
}());
exports.Tonada = Tonada;


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"tonada","version":"1.0.0","description":"it is a ui kit have what you need to build a fast and quick dashboards and web apps without effort","main":"index.js","scripts":{"build":"node scripts/build.js","serve":"node scripts/serve.js"},"repository":{"url":"https://github.com/mahmoudshahin1111/tonada"},"keywords":["ui-kit"],"author":"codexline","license":"MIT","devDependencies":{"@types/lodash":"^4.14.184","concurrently":"^7.3.0","ts-loader":"^9.3.1","typescript":"^4.7.4","webpack":"^5.74.0","webpack-cli":"^4.10.0"},"packages":[{"name":"slider","className":"TonadaSlider","path":"src/packages/slider/index.ts"},{"name":"input","className":"TonadaInput","path":"src/packages/input/index.ts"},{"name":"input-password","className":"TonadaInputPassword","path":"src/packages/input-password/index.ts"},{"name":"input-checkbox","className":"TonadaInputCheckbox","path":"src/packages/checkbox/index.ts"},{"name":"input-checkbox-group","className":"TonadaInputCheckboxGroup","path":"src/packages/checkbox-group/index.ts"},{"name":"accordion","className":"TonadaAccordion","path":"src/packages/accordion/index.ts"},{"name":"select","className":"TonadaSelect","path":"src/packages/select/index.ts"}],"dependencies":{"chalk":"^3.0.0","lodash":"^4.17.21"},"workspaces":["src/packages/*"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.create = void 0;
var package_json_1 = __webpack_require__(/*! ../package.json */ "./package.json");
var tonada_core_1 = __webpack_require__(/*! tonada-core */ "./src/packages/tonada-core/index.ts");
var packClasses = [];
for (var _i = 0, packages_1 = package_json_1.packages; _i < packages_1.length; _i++) {
    var pack = packages_1[_i];
    var tonadaComponentClass = window[pack.className];
    if (tonadaComponentClass) {
        packClasses.push({
            name: pack.name,
            componentClass: tonadaComponentClass,
        });
    }
}
var tonada = new tonada_core_1.Tonada(packClasses);
var create = function (componentName, element, options) {
    return tonada.create(componentName, element, options);
};
exports.create = create;

})();

window.Tonada = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map