import { BaseElement } from "../components/base-element";
import _ from 'lodash';

function querySelector(element: HTMLElement, query: string): BaseElement[] {
  const elements: BaseElement[] = [];
  element.querySelectorAll(query).forEach((element: HTMLElement) => {
    elements.push(createBaseElement(element));
  });
  return elements;
}

function createBaseElement(element: HTMLElement) {
  return new BaseElement(element);
}

function extendObject<T>(base: any, mixin: any): T {
  Object.getOwnPropertyNames(mixin).forEach((name) => {
    base[name] = mixin[name];
  });
  return base;
}

function clone(obj:any){
  return _.clone(obj);
}
function generateUniqueId(){
  return _.uniqueId();
}

export { querySelector, createBaseElement, extendObject,clone,generateUniqueId};
