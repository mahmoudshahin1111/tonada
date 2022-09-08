import { createBaseElement } from "tonada-shared";
import { Accordion } from "./src/accordion";
 function create(element: HTMLDivElement) {
    const component = new Accordion(createBaseElement(element));
    component.build();
    return component;
  }
export { Accordion, create };
  
