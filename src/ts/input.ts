import { TornadaElement } from "./tornada-element";

export default class Input {
    constructor(private _element:TornadaElement){
     this._element.getElement().addEventListener('focus',e=>this.onFocus(e))   
    }
    private onFocus(event:FocusEvent) {
        console.log('focus')
    }
}
