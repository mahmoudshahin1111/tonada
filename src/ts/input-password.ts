import { BaseElement } from "./base-element";
import { Input } from "./input";

export class InputPassword extends BaseElement{
  private _toggler:HTMLElement;
  constructor(private _input:Input) {
    super();
    this._toggler = document.createElement('i');
    this._toggler.classList.add('tonada-password-toggle fa-solid fa-eye');
    this.appendChild(this._input);
    this.appendChild(this._toggler);
    this._toggler.addEventListener("click", () => {
      this.toggle();
    } );
  }
  getToggler():HTMLElement {
    return this._input.querySelector(".tonada-password-toggle");
  }
  toggle() {
    if (this.isToggled()) {
      this.hiddenText();
    } else {
      this.show();
    }
    this._input.focus();
  }
  show() {
    this._input.setAttribute("type", "text");
    this.getToggler().classList.remove('fa-eye');
    this.getToggler().classList.add('fa-eye-slash');
  }
  hiddenText() {
    this._input.setAttribute("type", "password");
    this.getToggler().classList.remove('fa-eye-slash');
    this.getToggler().classList.add('fa-eye');
  }
  isToggled() {
    return this._input.getAttribute("type") == "text";
  }
}

