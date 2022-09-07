import { BaseElement } from "./base-element";
import _ from 'lodash';

function querySelector<T extends HTMLElement,S extends HTMLElement>(element: T, query: string): BaseElement<S>[] {
  const elements: BaseElement<S>[] = [];
  element.querySelectorAll(query).forEach((element: HTMLElement) => {
    elements.push(createBaseElement<S>(element));
  });
  return elements;
}

function createBaseElement<T extends HTMLElement>(element: HTMLElement) {
  return new BaseElement<T>(element as any);
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
