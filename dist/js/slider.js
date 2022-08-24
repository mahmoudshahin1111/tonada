(()=>{"use strict";var e={62:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseElement=void 0;var i=n(991),o=function(){function e(e){this.element=e}return e.prototype.getAttributes=function(){var e=this;return this.element.getAttributeNames().map((function(t){return{name:t,value:e.element.getAttribute(t)}}))},e.prototype.querySelector=function(e){return(0,i.querySelector)(this.element,e)},e.prototype.onEvent=function(e,t){this.element.addEventListener(e,t)},e.prototype.addClass=function(e){this.element.classList.add(e)},e.prototype.removeClass=function(e){this.element.classList.remove(e)},e.prototype.toggleClass=function(e){this.element.classList.toggle(e)},e.prototype.setAttribute=function(e,t){this.element.setAttribute(e,t)},e.prototype.getAttribute=function(e){return this.element.getAttribute(e)},e.prototype.getHeight=function(){return this.element.getBoundingClientRect().height},e.prototype.getWidth=function(){return this.element.getBoundingClientRect().width},e.prototype.setStyle=function(e,t){this.element.style[e]=t},e.prototype.hasClass=function(e){return this.element.classList.contains(e)},e.prototype.getLeft=function(){return this.element.getBoundingClientRect().left},e.prototype.getTop=function(){return this.element.getBoundingClientRect().top},e.prototype.hide=function(){this.setStyle("display","none")},e}();t.BaseElement=o},380:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0;t.Component=function(e){this.element=e}},530:function(e,t,n){var i,o=this&&this.__extends||(i=function(e,t){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},i(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.SliderPaginator=t.SliderItem=t.SliderSwitchFadingState=t.SliderSwitchMovingState=t.Slider=t.create=void 0;var r=n(62),s=n(380),a=n(991),l=n(480);t.create=function(e,t){return new c((0,a.createBaseElement)(e),t)};var c=function(e){function t(t,n){var i=e.call(this,t)||this;i.options=n,i.sliderItems=[],i.page=0,i.options=Object.assign({itemsPerPage:1,slideAnimation:"moving",spaceBetween:0},i.options),i.sliderSlidingAnimationState=new p,"fading"===i.options.slideAnimation&&(i.sliderSlidingAnimationState=new u),i.list=i.element.querySelector(":scope > .".concat(l.PREFIX,"-list")).at(0),i.list.querySelector(":scope > .".concat(l.PREFIX,"-list-item")).forEach((function(e){var t,n=i.list.getWidth()/(null===(t=i.options)||void 0===t?void 0:t.itemsPerPage)-i.options.spaceBetween/2;i.sliderItems.push(new d(e,{width:n}))})),i.sliderPaginator=new g(i.element.querySelector(":scope > .".concat(l.PREFIX,"-slider-paginator")).at(0),i.sliderSlidingAnimationState.getPagesCount(i));var o=i.element.querySelector(":scope > .".concat(l.PREFIX,"-slider-button"));return i.prevButton=o.at(0),i.nextButton=o.at(1),i.prevButton.onEvent("click",(function(){console.log("prev button clicked"),i.prevSlider()})),i.nextButton.onEvent("click",(function(){console.log("next button clicked"),i.nextSlider()})),i.sliderPaginator.onPageClicked=function(e){i.goToPage(e)},i.sliderSlidingAnimationState.init(i),i.sliderPaginator.setActivePage(i.page),i.sliderItems.length/i.options.itemsPerPage<=1&&(i.sliderPaginator.element.hide(),i.nextButton.hide(),i.prevButton.hide()),i}return o(t,e),t.prototype.prevSlider=function(){this.sliderSlidingAnimationState.prevSlider(this)},t.prototype.nextSlider=function(){this.sliderSlidingAnimationState.nextSlider(this)},t.prototype.goToPage=function(e){this.sliderSlidingAnimationState.goToPage(this,e)},t}(s.Component);t.Slider=c;var p=function(){function e(){}return e.prototype.init=function(e){e.sliderItems.forEach((function(t,n){var i;t.element.setStyle("transform","translateX(".concat(e.list.getWidth()/(null===(i=e.options)||void 0===i?void 0:i.itemsPerPage)*n,"px)"))}))},e.prototype.sliderToPage=function(e,t){e.sliderPaginator.setActivePage(Math.ceil(t/e.options.itemsPerPage)),e.sliderItems.forEach((function(n,i){if(e.sliderItems.length-t<e.options.itemsPerPage&&i>=t){var o=e.list.getWidth()/(e.sliderItems.length-t)-e.options.spaceBetween/2;n.element.setStyle("width","".concat(o,"px"))}n.element.setStyle("transform","translateX(".concat((i-t)*(n.element.getWidth()+e.options.spaceBetween),"px)"))}))},e.prototype.getPagesCount=function(e){return Math.ceil(e.sliderItems.length/e.options.itemsPerPage)},e.prototype.prevSlider=function(e){e.page<=0||(e.page-=e.options.itemsPerPage,this.sliderToPage(e,e.page))},e.prototype.nextSlider=function(e){e.page*e.options.itemsPerPage>=e.sliderItems.length-2||(e.page+=e.options.itemsPerPage,this.sliderToPage(e,e.page))},e.prototype.goToPage=function(e,t){e.page=t*e.options.itemsPerPage,console.log("go to page ".concat(e.page)),this.sliderToPage(e,e.page)},e}();t.SliderSwitchMovingState=p;var u=function(){function e(){}return e.prototype.init=function(e){e.sliderItems.forEach((function(e,t){e.element.setStyle("opacity","0"),e.element.setStyle("left","0px"),e.element.setStyle("width","100%")})),this.sliderToPage(e,0)},e.prototype.sliderToPage=function(e,t){e.page=t,e.sliderPaginator.setActivePage(t),e.sliderItems.forEach((function(e,n){n===t?e.element.setStyle("opacity","1"):e.element.setStyle("opacity","0")}))},e.prototype.getPagesCount=function(e){return e.sliderItems.length},e.prototype.prevSlider=function(e){0!==e.page&&(e.page-=1,this.sliderToPage(e,e.page))},e.prototype.nextSlider=function(e){e.page!==e.sliderItems.length-1&&(e.page+=1,this.sliderToPage(e,e.page))},e.prototype.goToPage=function(e,t){this.sliderToPage(e,t)},e}();t.SliderSwitchFadingState=u;var d=function(e,t){this.element=e,this.element.setStyle("width","".concat(t.width,"px"))};t.SliderItem=d;var g=function(){function e(e,t){this.element=e,this._pages=[];for(var n=0;n<t;n++)this.createPage(n)}return e.prototype.createPage=function(e){var t=this,n=document.createElement("span"),i=new r.BaseElement(n);i.addClass("".concat(l.PREFIX,"-slider-paginator-page")),i.setAttribute("data-page",e.toString()),i.onEvent("click",(function(){t.onPageClicked(e)})),this.element.element.appendChild(i.element),this._pages.push(i)},e.prototype.setActivePage=function(e){this._pages.forEach((function(t){t.getAttribute("data-page")===e.toString()?t.addClass("".concat(l.PREFIX,"-active")):t.removeClass("".concat(l.PREFIX,"-active"))}))},e}();t.SliderPaginator=g},991:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.extendObject=t.createBaseElement=t.querySelector=void 0;var i=n(62);function o(e){return new i.BaseElement(e)}t.querySelector=function(e,t){var n=[];return e.querySelectorAll(t).forEach((function(e){n.push(o(e))})),n},t.createBaseElement=o,t.extendObject=function(e,t){return Object.getOwnPropertyNames(t).forEach((function(n){e[n]=t[n]})),e}},480:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PREFIX=t.VERSION=void 0,t.VERSION="1.0.0",t.PREFIX="tonada"}},t={},n=function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}(530);window.TonadaSlider=n})();