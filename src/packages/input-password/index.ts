import { createBaseElement } from "tonada-shared";
import { InputPassword } from "./src/input-password";
function create(element: HTMLDivElement) {
    const component = new InputPassword(createBaseElement(element));
    component.build();
    return component;
  }
  
export { InputPassword, create };
