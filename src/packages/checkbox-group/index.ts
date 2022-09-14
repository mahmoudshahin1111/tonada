import { createBaseElement } from "tonada-shared";
import { CheckboxGroup } from "./src/checkbox-group";
import { Config } from "./src/_common/types";

function create(element: HTMLDivElement,config:Config) {
    const component = new CheckboxGroup(createBaseElement(element),config);
    component.build();
    return component;
  }
  export { CheckboxGroup, create };
  