(()=>{"use strict";var t={62:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BaseElement=void 0;var o=n(991),r=function(){function t(t){this.element=t}return t.prototype.getAttributes=function(){var t=this;return this.element.getAttributeNames().map((function(e){return{name:e,value:t.element.getAttribute(e)}}))},t.prototype.querySelector=function(t){return(0,o.querySelector)(this.element,t)},t.prototype.onEvent=function(t,e){this.element.addEventListener(t,e)},t.prototype.addClass=function(t){this.element.classList.add(t)},t.prototype.removeClass=function(t){this.element.classList.remove(t)},t.prototype.toggleClass=function(t){this.element.classList.toggle(t)},t.prototype.setAttribute=function(t,e){this.element.setAttribute(t,e)},t.prototype.getAttribute=function(t){return this.element.getAttribute(t)},t.prototype.getHeight=function(){return this.element.getBoundingClientRect().height},t.prototype.getWidth=function(){return this.element.getBoundingClientRect().width},t.prototype.setStyle=function(t,e){this.element.style[t]=e},t.prototype.hasClass=function(t){return this.element.classList.contains(t)},t.prototype.getLeft=function(){return this.element.getBoundingClientRect().left},t.prototype.getTop=function(){return this.element.getBoundingClientRect().top},t.prototype.hide=function(){this.setStyle("display","none")},t}();e.BaseElement=r},380:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Component=void 0;e.Component=function(t){this.element=t}},340:function(t,e,n){var o,r=this&&this.__extends||(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.InputPassword=e.create=void 0;var i=n(991),s=n(480),u=n(380);e.create=function(t){return new c((0,i.createBaseElement)(t))};var c=function(t){function e(e){var n=t.call(this,e)||this;return n._toggler=n.element.querySelector(":scope > .".concat(s.PREFIX,"-password-toggle")).at(0),n._input=n.element.querySelector("input").at(0),n._toggler.onEvent("click",(function(){return n.toggle()})),n}return r(e,t),e.prototype.toggle=function(){this.isToggled()?this.hidden():this.show()},e.prototype.show=function(){this._input.setAttribute("type","text"),this._toggler.removeClass("".concat(s.PREFIX,"-ic-show")),this._toggler.addClass("".concat(s.PREFIX,"-ic-hidden"))},e.prototype.hidden=function(){this._input.setAttribute("type","password"),this._toggler.removeClass("".concat(s.PREFIX,"-ic-hidden")),this._toggler.addClass("".concat(s.PREFIX,"-ic-show"))},e.prototype.isToggled=function(){return console.log(this._input.getAttribute("type")),"text"==this._input.getAttribute("type")},e}(u.Component);e.InputPassword=c},991:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.extendObject=e.createBaseElement=e.querySelector=void 0;var o=n(62);function r(t){return new o.BaseElement(t)}e.querySelector=function(t,e){var n=[];return t.querySelectorAll(e).forEach((function(t){n.push(r(t))})),n},e.createBaseElement=r,e.extendObject=function(t,e){return Object.getOwnPropertyNames(e).forEach((function(n){t[n]=e[n]})),t}},480:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PREFIX=e.VERSION=void 0,e.VERSION="1.0.0",e.PREFIX="tonada"}},e={},n=function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,n),i.exports}(340);window.TonadaInputPassword=n})();