import { BaseElement } from "./base-element";

export class InputPassword extends BaseElement {
  private _toggler:HTMLElement;
  private _input:HTMLInputElement;
  constructor(public element: HTMLDivElement) {
    super();
    this._toggler = this.element.querySelector(".tonada-password-toggle");
    this._input = this.element.querySelector("input");
    this._toggler.addEventListener("click", () => {
      this.toggle();
    } );
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
    this._toggler.classList.remove('fa-eye');
    this._toggler.classList.add('fa-eye-slash');
  }
  hidden() {
    this._input.setAttribute("type", "password");
    this._toggler.classList.remove('fa-eye-slash');
    this._toggler.classList.add('fa-eye');
  }
  isToggled() {
    return this._input.getAttribute("type") == "text";
  }
}

