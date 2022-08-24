import { createBaseElement } from "../utils/common";
import { PREFIX } from "../utils/defaults";
import { BaseElement } from "./base-element";
import { Component } from "./component";

export function create(element: HTMLDivElement) {
  return new Input(createBaseElement(element));
}

export class Input extends Component {
  input: BaseElement;
  label: BaseElement;
  constructor(element: BaseElement) {
    super(element);
    this.input = this.element.querySelector(`:scope > .${PREFIX}-input`).at(0);
    this.label = this.element.querySelector(`:scope > label`).at(0);
    if (this.label) {
      this.label.onEvent("click", () => {
        this.input.element.focus();
      });
    }
  }
}
