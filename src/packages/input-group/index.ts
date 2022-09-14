import { createBaseElement } from "tonada-shared";
import { InputGroup } from "./src/input-group";
function create(element: HTMLDivElement) {
    const component = new InputGroup(createBaseElement(element));
    component.build();
    return component;
  }
export { InputGroup, create };
