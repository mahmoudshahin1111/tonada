import { BaseElement } from "./base-element";

export default class Input {
    constructor(private _element:BaseElement){
     this._element.getElement().addEventListener('focus',e=>this.onFocus(e))   
    }
    private onFocus(event:FocusEvent) {
        console.log('focus')
    }
}
