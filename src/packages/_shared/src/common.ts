import { BaseElement } from "./base-element";

function querySelector<T extends HTMLElement, S extends HTMLElement>(
  element: T,
  query: string
): BaseElement<S>[] {
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

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
function generateUniqueId() {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );
}

/**
 * 
 * @param container 
 * @param args if the container was a function pass these args
 * @returns 
 */
function convertToHtml(
  container: string | Function | HTMLElement,
  ...args: any
): string {
  if (typeof container === "function") {
    return (container as Function).call(this, ...args);
  } else if (typeof container === "object") {
    return (container as HTMLElement).innerHTML;
  } else {
    return container as string;
  }
}

export {
  querySelector,
  createBaseElement,
  extendObject,
  clone,
  generateUniqueId,
  convertToHtml,
};
