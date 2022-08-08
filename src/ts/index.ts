import { BaseElement } from "./base-element";
import { Input } from "./input";
import { InputPassword } from "./input-password";



export function inputPassword(element: HTMLDivElement) {
  return new InputPassword(new Input(new BaseElement(element)));
}