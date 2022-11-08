import { createBaseElement } from "tonada-shared";
import { AutoComplete } from "./src/auto-complete";


function create(element: HTMLDivElement) {
    const component = new AutoComplete(createBaseElement(element));
    component.build();
    return component;
  }

export { AutoComplete, create };
