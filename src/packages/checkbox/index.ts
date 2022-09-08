import { createBaseElement } from "tonada-shared";
import { Checkbox } from "./src/checkbox";

function create(element: HTMLDivElement) {
    const component = new Checkbox(createBaseElement(element));
    component.build();
    return component;
  }
  export { Checkbox, create };
  