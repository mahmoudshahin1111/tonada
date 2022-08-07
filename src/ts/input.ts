import { BaseElement } from "./base-element";

export class Input {
  constructor(public baseElement: BaseElement) {}
  getInputElement(): HTMLInputElement {
    return this.baseElement._element.querySelector(".tonada-input");
  }
  getInputValue(): string {
    return this.getInputElement().value;
  } 
}
