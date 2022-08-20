import { BaseElement } from "./base-element";
import { createBaseElement } from "../utils/common";
import { PREFIX } from "../utils/defaults";
import { Component } from "./component";

export function create(element: HTMLDivElement) {
  return new InputPassword(createBaseElement(element));
}

export class InputPassword extends Component {
  private _toggler: BaseElement;
  private _input: BaseElement;
  constructor(element: BaseElement) {
    super(element);
    this._toggler = this.element
      .querySelector(`:scope > .${PREFIX}-password-toggle`)
      .at(0);
    this._input = this.element.querySelector("input").at(0);
    this._toggler.onEvent("click", () => this.toggle());
  }

  toggle() {
    if (this.isToggled()) {
      this.hidden();
    } else {
      this.show();
    }
  }
  show() {
    this._input.setAttribute("type", "text");
    this._toggler.removeClass(`${PREFIX}-ic-show`);
    this._toggler.addClass(`${PREFIX}-ic-hidden`);
  }
  hidden() {
    this._input.setAttribute("type", "password");
    this._toggler.removeClass(`${PREFIX}-ic-hidden`);
    this._toggler.addClass(`${PREFIX}-ic-show`);
  }
  isToggled() {
    console.log(this._input.getAttribute("type"));

    return this._input.getAttribute("type") == "text";
  }
}
