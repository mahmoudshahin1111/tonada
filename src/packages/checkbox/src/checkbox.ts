import { Component, createBaseElement } from "tonada-shared";

export class Checkbox  extends Component{
  build(): void {
    const fragment = document.createDocumentFragment();

    this.element.element.appendChild(fragment);
  }

}