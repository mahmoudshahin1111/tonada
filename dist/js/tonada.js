(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{createAccordion:()=>l,createInputPassword:()=>u});var n=function(){function t(t){this.element=t}return t.prototype.getAttributes=function(){var t=this;return this.element.getAttributeNames().map((function(e){return{name:e,value:t.element.getAttribute(e)}}))},t.prototype.querySelector=function(t){return function(t,e){var n=[];return t.querySelectorAll(e).forEach((function(t){n.push(o(t))})),n}(this.element,t)},t.prototype.onEvent=function(t,e){this.element.addEventListener(t,e)},t.prototype.addClass=function(t){this.element.classList.add(t)},t.prototype.removeClass=function(t){this.element.classList.remove(t)},t.prototype.toggleClass=function(t){this.element.classList.toggle(t)},t.prototype.setAttribute=function(t,e){this.element.setAttribute(t,e)},t.prototype.getAttribute=function(t){return this.element.getAttribute(t)},t.prototype.getHeight=function(){return this.element.getBoundingClientRect().height},t.prototype.getWidth=function(){return this.element.getBoundingClientRect().width},t.prototype.setStyle=function(t,e){this.element.style[t]=e},t.prototype.hasClass=function(t){return this.element.classList.contains(t)},t}();function o(t){return new n(t)}var i="tonada",s=function(){function t(t){var e=this;this._element=t,this._sections=new Array,this._element.querySelector(":scope > .".concat(i,"-accordion-section")).forEach((function(t){var n=new r(t);n.onToggled=function(){return e.closeTheOthersExcept(n)},e._sections.push(n)}))}return t.prototype.closeTheOthersExcept=function(t){this._sections.forEach((function(e){e!=t&&e.close()}))},t.prototype.getSections=function(){return this._sections},t}(),r=function(){function t(t){var e=this;this._element=t,this._header=this._element.querySelector(".".concat(i,"-accordion-header")).at(0),this._content=this._element.querySelector(".".concat(i,"-accordion-content")).at(0),this._contentHeight=this._content.getHeight(),this._header.onEvent("click",(function(){return e.toggle()})),this.close()}return t.prototype.toggle=function(){this._element.hasClass("".concat(i,"-closed"))?this.open():this.close(),this.onToggled()},t.prototype.open=function(){this._element.removeClass("".concat(i,"-closed")),this._content.setStyle("height","".concat(this._contentHeight.toString(),"px"))},t.prototype.close=function(){this._element.addClass("".concat(i,"-closed")),this._content.setStyle("height","0")},t}(),c=function(){function t(t){var e=this;this._element=t,this._toggler=this._element.querySelector(":scope > .".concat(i,"-password-toggle")).at(0),this._input=this._element.querySelector("input").at(0),this._toggler.onEvent("click",(function(){return e.toggle()}))}return t.prototype.toggle=function(){this.isToggled()?this.hidden():this.show()},t.prototype.show=function(){this._input.setAttribute("type","text"),this._toggler.removeClass("".concat(i,"-ic-show")),this._toggler.addClass("".concat(i,"-ic-hidden"))},t.prototype.hidden=function(){this._input.setAttribute("type","password"),this._toggler.removeClass("".concat(i,"-ic-hidden")),this._toggler.addClass("".concat(i,"-ic-show"))},t.prototype.isToggled=function(){return console.log(this._input.getAttribute("type")),"text"==this._input.getAttribute("type")},t}();function u(t){return new c(o(t))}function l(t){return new s(o(t))}window.Tornada=e})();