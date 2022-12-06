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
  removeAttribute(name: string) {
    this.element.removeAttribute(name);
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
  getBottom(): number {
    return this.getTop() + this.getHeight();
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
  getRight(){
    return this.element.getBoundingClientRect().right;
  }
  getTop() {
    return this.element.getBoundingClientRect().top;
  }
  getBoundingClientRect(){
    return this.element.getBoundingClientRect();
  }
  hide() {
    this.setStyle("display", "none");
  }
  show(){
    this.setStyle("display","inline-block");
  }
  remove(){
    this.element.remove();
  }
  setObjectRef<T>(obj:T):void{
    (this.element as any)['_objRef'] = obj;
  }
  getObjRef<T>():T|null{
    return (this.element as any)['_objRef'] || null;
  }
}
