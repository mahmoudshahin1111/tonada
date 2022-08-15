import { BaseElement } from "./base-element";
import { PREFIX } from "./shared";

export class InputPassword {
  private _toggler: BaseElement;
  private _input: BaseElement;
  constructor(private _element: BaseElement) {
    this._toggler = this._element
      .querySelector(`:scope > .${PREFIX}-password-toggle`)
      .at(0);
    this._input = this._element.querySelector("input").at(0);
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
