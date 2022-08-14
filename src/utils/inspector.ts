import { BaseElement } from "../ts/base-element";

function querySelector(
  element: HTMLElement,
  query: string,
): BaseElement[] {
  const elements: BaseElement[] = [];
  element
    .querySelectorAll(query)
    .forEach((element: HTMLElement) => {
      elements.push(createBaseElement(element));
    });
  return elements;
}


function createBaseElement(element:HTMLElement){
  return new BaseElement(element);
}

export { querySelector ,createBaseElement};
