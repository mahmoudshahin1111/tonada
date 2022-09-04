import { generateUniqueId, querySelector } from "./common";
import { KEY_ATTRIBUTE_NAME } from "./defaults";

export class BaseElement<T extends HTMLElement = any> {
  key: string;
  constructor(public element: T) {
    this.key = generateUniqueId();
    this.element.setAttribute(KEY_ATTRIBUTE_NAME, this.key);
  }
  appendChild<T extends HTMLElement>(baseElement: BaseElement<T>) {
    this.element.appendChild(baseElement.element);
  }
  getAttributes(): { name: string; value: string }[] {
    return this.element.getAttributeNames().map((name) => {
      return {
        name: name,
        value: this.element.getAttribute(name),
      };
    });
  }
  querySelector<S extends HTMLElement = any>(query: string):BaseElement<S>[] {
    return querySelector<T,S>(this.element, query);
  }
  onEvent(eventKey: string, callback: (e: Event) => void) {
    this.element.addEventListener(eventKey, callback);
  }
  addClass(className: string) {
    this.element.classList.add(className);
  }
  removeClass(className: string) {
    this.element.classList.remove(className);
  }
  toggleClass(className: string) {
    this.element.classList.toggle(className);
  }
  setAttribute(name: string, value: string) {
    this.element.setAttribute(name, value);
  }
  getAttribute(name: string) {
    return this.element.getAttribute(name);
  }
  getHeight(): number {
    return this.element.getBoundingClientRect().height;
  }
  getWidth(): number {
    return this.element.getBoundingClientRect().width;
  }
  setStyle(name: string, value: string) {
    this.element.style[name as any] = value;
  }
  hasClass(className: string) {
    return this.element.classList.contains(className);
  }
  getLeft() {
    return this.element.getBoundingClientRect().left;
  }
  getTop() {
    return this.element.getBoundingClientRect().top;
  }
  hide() {
    this.setStyle("display", "none");
  }
}
