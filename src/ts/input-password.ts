import { BaseElement } from "./base-element";
import { Input } from "./input";

export class InputPassword {
  constructor(public input: Input) {
    this.getToggler().addEventListener("click", () => {
      this.toggle();
    } );
  }
  getToggler():HTMLElement {
    return this.input.baseElement._element.querySelector(".tonada-password-toggle");
  }
  toggle() {
    if (this.isToggled()) {
      this.hidden();
    } else {
      this.show();
    }
    this.input.getInputElement().focus();
  }
  show() {
    this.input.getInputElement().setAttribute("type", "text");
    this.getToggler().classList.remove('fa-eye');
    this.getToggler().classList.add('fa-eye-slash');
  }
  hidden() {
    this.input.getInputElement().setAttribute("type", "password");
    this.getToggler().classList.remove('fa-eye-slash');
    this.getToggler().classList.add('fa-eye');
  }
  isToggled() {
    return this.input.getInputElement().getAttribute("type") == "text";
  }
}

