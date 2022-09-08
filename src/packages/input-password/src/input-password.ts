import {
  BaseElement,
  Component,
  createBaseElement,
  PREFIX,
} from "tonada-shared";


export class InputPassword extends Component {
  private _toggler: BaseElement<HTMLElement>;
  private _input: BaseElement<HTMLElement>;
  private _label: BaseElement<HTMLElement>;
  constructor(element: BaseElement<HTMLElement>) {
    super(element);
  }
  build(): void {
    this._toggler = this.element
      .querySelector(`:scope > .${PREFIX}-password-toggle`)
      .at(0);
    this._input = this.element.querySelector(":scope > input").at(0);
    this._label = this.element.querySelector(":scope > label").at(0);
    this._toggler.onEvent("click", () => this.toggle());
    if (this._label) {
      this._label.onEvent("click", () => this._input.element.focus());
    }
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
    return this._input.getAttribute("type") == "text";
  }
}
