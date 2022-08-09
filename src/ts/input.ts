import { BaseElement } from "./base-element";



export class Input extends BaseElement {
  public _input:HTMLInputElement;
  constructor() {
    super();
    this._input = document.createElement('input');
    this._input.classList.add('tonada-input');
    this.appendChild(this._input);
  }
  getInputElement(): HTMLInputElement {
    return this._input;
  }
  getInputValue(): string {
    return this,this._input.value;
  } 
}
