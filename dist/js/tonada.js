(()=>{"use strict";var t={};(t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})})(t);const e=function(){function t(t){var e=this;this._element=t,this._element.getElement().addEventListener("focus",(function(t){return e.onFocus(t)}))}return t.prototype.onFocus=function(t){console.log("focus")},t}();var n=function(){function t(t){this._element=t}return t.prototype.getElement=function(){return this._element},t.prototype.getAttribute=function(t){return this._element.getAttribute(t)},t.prototype.setAttribute=function(t,e){this._element.setAttribute(t,e)},t.prototype.removeAttribute=function(t){this._element.removeAttribute(t)},t}();window.document.addEventListener("DOMContentLoaded",(function(){window.document.body.querySelectorAll(".tornada-input").forEach((function(t){var o=new e(new n(t));console.log("input created",o)}))})),window.Tornada=t})();