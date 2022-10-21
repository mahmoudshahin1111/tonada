import { BaseElement } from "./base-element";
import { PREFIX } from "./defaults";

export abstract class Component<T extends HTMLElement = any> {
  constructor(public element: BaseElement<T>) {}
  abstract build(): void;
  hide() {
    this.element.setAttribute("hidden", "");
  }
  show() {
    this.element.removeAttribute("hidden");
  }
}
