export class BaseElement {
    constructor(private _element:HTMLElement) {
    }
    getElement() {
        return this._element;
    }
    getAttribute(name:string) {
        return this._element.getAttribute(name);
    }
    setAttribute(name:string, value:string) {
        this._element.setAttribute(name, value);
    }
    removeAttribute(name:string) {
        this._element.removeAttribute(name);
    }
}