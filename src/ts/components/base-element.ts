import { generateUniqueId, querySelector } from "../utils/common";
import { PREFIX } from "../utils/defaults";

export class BaseElement {
  key: string;
  constructor(public element: HTMLElement) {
    this.element.setAttribute(`data-${PREFIX}-key`, generateUniqueId());
  }
  getAttributes(): { name: string; value: string }[] {
    return this.element.getAttributeNames().map((name) => {
      return {
        name: name,
        value: this.element.getAttribute(name),
      };
    });
  }
  querySelector(query: string) {
    return querySelector(this.element, query);
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
