import { createBaseElement } from "tonada-shared";
import { Checkbox } from "./src/checkbox";
import { Config } from "./src/_common/types";

function create(element: HTMLDivElement,config:Config) {
    const component = new Checkbox(createBaseElement(element),config);
    component.build();
    return component;
  }
  export { Checkbox, create };
  